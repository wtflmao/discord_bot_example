const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojibutton')
        .setDescription('Replies with a button, bu stylish!'),

    async execute(interaction) {

        const rowPrimary = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b1')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('😀'),
            );

        const rowSecondary = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b2')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('😁'),
            );

        const rowSuccess = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b3')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('🤣'),
            );

        const rowDanger = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`b4`)
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('😇'),
            );

        const rowLink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // you cant .setCustomId() to a Link button
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://support.discord.com/hc/en-us")
                    .setEmoji('🤪'),
            );

        // components array must be 5 or fewer.
        await interaction.reply({ content: 'There are some buttons:', components: [rowPrimary, rowSecondary, rowSuccess, rowDanger, rowLink], ephemeral: false });},
};