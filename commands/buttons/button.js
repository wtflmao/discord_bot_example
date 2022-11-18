const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

let updatedBtnMsg = new Map();

module.exports = {
	data: new SlashCommandBuilder()
       .setName('button')
       .setDescription('Replies with a button!'),

	async execute(interaction) {
		updatedBtnMsg.set("0", false);

		const rowDanger = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					// Randomize the button's customId for good luck, like "b4_90372" or "b4_1827".
					.setCustomId(`b4_${Math.floor(Math.random() * 100000)}`)
					.setLabel("Click me!")
					.setStyle(ButtonStyle.Danger),
			);

		const rowDangerD = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					// Because the button is disabled, no one can actually click that.
					// So there's no avail to randomize its customId.
					.setCustomId('b4d')
					.setLabel("YOU CLICKED ME!")
					.setStyle(ButtonStyle.Danger)
					.setDisabled(true),
			);

		const rowSecD = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					// Because the button is disabled, no one can actually click that.
					// So there's no avail to randomize its customId.
					.setCustomId('b2d')
					.setLabel("It's fine.")
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
			);

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("hhzm's blog")
			.setURL('https://www.cnblogs.com/hhzm/')
			.setDescription("hhzm's cnblog site");

		await interaction.reply({ content: 'This is a Danger button:', components: [rowDanger], embeds: [embed], ephemeral: false });

		const filter = i => {
			// If the target message has been collected and edited by the other collector instance,
			// then return false, telling the current collector that "do not collect this msg, or else, DIE!!", LOL.
			if (updatedBtnMsg.has(i.message.id)) {
				return false;
			} else {
				// Here, this msg hasn't been collected yet.
				if (i.customId.startsWith('b4') && (i.user.id === interaction.user.id)) {
					// Here, it fulfills our requirements: a.is a DANGEROUS button(customId starts with "b4_"), and b. the "button msg"'s author is the person that presses the button
					// Put this <i.message.id, true> record into the Map, so that we can no longer collect it
					// (like when many active collectors all see the same button interaction fulfills its requirements, then they all wanna edit the same msg, but to only find the interaction has already been acknowledged and the bot be halted.)
					updatedBtnMsg.set(i.message.id, true);
					return true;
				} else {
					// Here, it doesn't meet all the requirements we need, so do not collect it.
					return false;
				}
			}
		};

		const collector = interaction.channel.createMessageComponentCollector({
			filter,
			max: 1, // We only want this collector instance collects 1 eligible message component
			time: 15 * 1000, // 15.000 secs
		});

		collector.on('collect', async i => {
			await i.update({ content: `A DANGEROUS button was clicked! ${i.customId}`, embeds: [], components: [rowDangerD] });
			await wait(6969);

			// use .editReply() rather than another .update() here
			// Passing an empty array to the components option will remove any buttons after one has been clicked.
			// Passing an empty array to the embeds option will remove any embeds after one has been clicked.
			await i.editReply({ content: `Danger mitigated.`, components: [rowSecD], embeds: [] });
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);

			// To make sure there's at least one item in the array,
			// to prevent accessing the first element of an empty array, which leads to out-of-bounds memory access
			if (collected.size > 0) {
				console.log((Array.from(collected.values()))[0].customId);
			}
		});

	},
};