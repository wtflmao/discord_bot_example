const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

let updatedBtnMsg = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ddbutton')
        .setDescription('Replies with a button, but deferred, also self-delete!'),

    async execute(interaction) {
        updatedBtnMsg.set("0", false);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // Randomize the button's customId for good luck, like "b1_90372" or "b1_1827".
                    .setCustomId(`b1_${Math.floor(Math.random() * 100000)}`)
                    .setLabel("Update weather data")
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ content: 'This is a button:', components: [row], embeds: [], ephemeral: false });

        const filter = i => {
            // If the target message has been collected and edited by the other collector instance,
            // then return false, telling the current collector that "do not collect this msg, or else, DIE!!", LOL.
            if (updatedBtnMsg.has(i.message.id)) {
                return false;
            } else {
                // Here, this msg hasn't been collected yet.
                if (i.customId.startsWith('b1') && (i.user.id === interaction.user.id)) {
                    // Here, it fulfills our requirements: a.is a DANGEROUS button(customId starts with "b4_"), and b. the "button msg"'s author is the person that presses the button
                    // Put this <i.message.id, true> record into the Map, so that we can no longer collect it
                    // (like when many active collectors all see the same button interaction fulfills its requirements, then they all wanna edit the same msg, but to only find the interaction has already been acknowledged and the bot be halted.)
                    updatedBtnMsg.set(i.message.id, true);
                } else {
                    // Here, it doesn't meet all the requirements we need, so do not collect it.
                    return false;
                }
            }
            updatedBtnMsg.delete(i.message.id);
            return true;
        };

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 18000, // 18 secs
        });

        collector.on('collect', async i => {
            // use .deferUpdate() to simulate an API response process from a weather channel.
            await i.deferUpdate();
            await i.editReply({ content: `Updating...`, components:[] });
            await wait(3350); //wait 3.350 secs
            await i.editReply({ content: `Las Vegas, NV\nAs of ${Math.floor(Math.random() * 11) + 1}:${Math.floor(Math.random() * 59)} am PST\n44°F\nFair\nDay ${Math.floor(Math.random() * 10) + 66}°F • Night ${39 - Math.floor(Math.random() * 10)}°F`, embeds: [], components: [row] });
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);

            // To make sure there's at least one item in the array,
            // to prevent accessing the first element of an empty array, which leads to out-of-bounds memory access
            if (collected.size > 0) {
                // To delete the whole reply, do .deleteReply() for the last collected item, not all the items.
                (Array.from(collected.values()))[collected.size - 1].deleteReply();
                console.log((Array.from(collected.values()))[0].customId);
            }
        });

    },
};