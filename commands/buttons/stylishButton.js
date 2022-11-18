const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stylishbutton')
        .setDescription('Replies with a button, bu stylish!'),

    async execute(interaction) {

        const rowPrimary = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b1')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
            );

        const rowSecondary = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b2')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Secondary),
            );

        const rowSuccess = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b3')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Success),
            );

        const rowDanger = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`b4_${Math.floor(Math.random() * 100000)}`)
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Danger),
            );

        const rowLink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // you cant .setCustomId() to a Link button
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://support.discord.com/hc/en-us"),
            );

        const rowPrimaryD = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b1d')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
            );

        const rowSecondaryD = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b2d')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
            );

        const rowSuccessD = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b3d')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
            );

        const rowDangerD = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('b4d')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
            );

        const rowLinkD = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // you cant .setCustomId() to a Link button
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://support.discord.com/hc/en-us")
                    .setDisabled(true),
            );

        await interaction.reply({ content: 'This is a Primary button:', components: [rowPrimary, rowPrimaryD], ephemeral: false });
        await interaction.followUp({ content: 'This is a Secondary button:', components: [rowSecondary, rowSecondaryD], ephemeral: false });
        await interaction.followUp({ content: 'This is a Success button:', components: [rowSuccess, rowSuccessD], ephemeral: false });
        await interaction.followUp({ content: 'This is a Danger button:', components: [rowDanger, rowDangerD], ephemeral: false });
        await interaction.followUp({ content: 'This is a Link button:', components: [rowLink, rowLinkD], ephemeral: false });
    },
};