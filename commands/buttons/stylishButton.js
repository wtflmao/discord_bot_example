const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stylishbutton')
        .setDescription('Replies with a button, bu stylish!'),

    async execute(interaction) {

        let button1 = [], button1d = [];

        // generate 5 Primary buttons here
        for (let i = 1; i <= 5; i++) {
            button1.push(new ButtonBuilder()
                // you need to make sure the customIDs are unique in the same reply message.
                .setCustomId(`b1_${i}`)
                .setLabel(`Click me(${i})!`)
                .setStyle(ButtonStyle.Primary),);
        }

        // generate 4 Primary disabled buttons
        for (let i = 1; i <= 4; i++) {
            button1d.push(new ButtonBuilder()
                // you need to make sure the customIDs are unique in the same reply message.
                .setCustomId(`b1d_${i}`)
                .setLabel(`Click me(${i})!`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),);
        }

        // put 5 buttons in one same row
        const rowPrimary = new ActionRowBuilder()
            .addComponents(button1);

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
                new ButtonBuilder()
                    .setCustomId('b3d')
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true),
            );

        const rowDanger = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // you need to make sure the customIDs are unique in the same reply message.
                    // here we use a random number generator to randomize IDs.
                    .setCustomId(`b4_${Math.floor(Math.random() * 100000)}`)
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Danger),
            );

        const rowLink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // you can't .setCustomId() to a Link button
                    .setLabel("Click me!")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://support.discord.com/hc/en-us"),
            );

        // put 4 disabled buttons in one same row
        const rowPrimaryD = new ActionRowBuilder()
            .addComponents(button1d);

        const rowPrimary2D = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`owo`)
                    .setLabel("owo")
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

        // we insert 3 rows here, every single button's customId should be unique in the same reply msg
        await interaction.reply({ content: 'These are some Primary buttons:', components: [rowPrimary, rowPrimaryD, rowPrimary2D], ephemeral: false });

        // two rows here
        await interaction.followUp({ content: 'These are two Secondary buttons. They are NOT on the same row:', components: [rowSecondary, rowSecondaryD], ephemeral: false });

        // only one row here
        await interaction.followUp({ content: 'These are two Success buttons. They are on the same row:', components: [rowSuccess], ephemeral: false });

        // two rows here
        await interaction.followUp({ content: 'These are two Danger buttons. They are NOT on the same row:', components: [rowDanger, rowDangerD], ephemeral: false });

        // two rows here
        await interaction.followUp({ content: 'These are two Link buttons. They are NOT on the same row:', components: [rowLink, rowLinkD], ephemeral: false });
    },
};