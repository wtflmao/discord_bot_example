const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

let updatedBtnMsg = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embeddedbutton')
        .setDescription('Replies with a button, but embedded!'),

    async execute(interaction) {
        updatedBtnMsg.set("0", false);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // Randomize the button's customId for good luck, like "b3_90372" or "b3_1827".
                    .setCustomId(`b3_${Math.floor(Math.random() * 100000)}`)
                    .setLabel("Got it! Dismiss.")
                    .setStyle(ButtonStyle.Success),
            );

        const rowD = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`b3d`)
                    .setLabel("Got it! Dismiss.")
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
            );

        const hc = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(">>>Discord Help Center<<<")
            .setURL('https://support.discord.com/hc/en-us')
            .setDescription("Need help? We've got your back.");

        await interaction.reply({ content: 'R U seeking for assistance using Discord?', components: [row], embeds: [hc], ephemeral: true });

        const filter = i => {
            // If the target message has been collected and edited by the other collector instance,
            // then return false, telling the current collector that "do not collect this msg, or else, DIE!!", LOL.
            if (updatedBtnMsg.has(i.message.id)) {
                return false;
            } else {
                // Here, this msg hasn't been collected yet.
                if (i.customId.startsWith('b3')) {
                    // We don't need to verify whether the button msg's author is the same as the button interaction caller, cuz the button msg is ephemeral.
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
            time: 60 * 1000, // 60.000 secs
        });

        collector.on('collect', async i => {
            // Passing an empty array to the components option will remove any buttons after one has been clicked.
            // Passing an empty array to the embeds option will remove any embeds after one has been clicked.
            await i.update({ content: `Nice.`, components: [rowD], embeds: []});
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