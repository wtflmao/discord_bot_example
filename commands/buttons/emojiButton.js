const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojibutton')
        .setDescription('Replies with a button, bu stylish!'),

    async execute(interaction) {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b1')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('😀'),
                new ButtonBuilder()
                    .setCustomId('b2')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('😁'),
                new ButtonBuilder()
                    .setCustomId('b3')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('🤣'),
                new ButtonBuilder()
                    .setCustomId(`b4`)
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('😇'),
                new ButtonBuilder()
                    // you cant .setCustomId() to a Link button
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://support.discord.com/hc/en-us")
                    .setEmoji('🤪'),
            );

        // components array must be 5 or fewer.
        await interaction.reply({ content: 'There are some buttons:', components: [row], ephemeral: false });},
};