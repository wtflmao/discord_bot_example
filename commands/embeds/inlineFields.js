const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inlinefields')
        .setDescription('Replies with embed!'),
    async execute(interaction) {
        // This EmbedBuilder() has to be inside a command or listener
        const exampleEmbed = new EmbedBuilder()
            .setTitle('test')
            .addFields({ name: 'B1', value: '1', inline: true })
            .addFields(
                { name: 'B2', value: '2', inline: true },
                { name: 'C1', value: '3' },
                { name: 'D1', value: '4', inline: true }
            )
            .addFields(
                { name: 'D2', value: '5', inline: true },
                { name: 'D3', value: '6', inline: true }
            );
        await interaction.reply({ content: "Here's an inline embed example", embeds: [exampleEmbed] });
    },
};