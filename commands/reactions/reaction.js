const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('react')
        .setDescription('Replies with reaction!'),
    async execute(interaction) {

        const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
        await message.react('😄');

        const message2 = await interaction.followUp({ content: "Here's a custom emoji!", fetchReply: true });
        await message2.react('<:WumpusMistletoe2:1067024784057184266>');

        const message3 = await interaction.followUp({ content: "Here we grab an emoji by its name", fetchReply: true });
        await message3.react(message3.guild.emojis.cache.find(emoji => emoji.name === 'WumpusMistletoe2'));

        const message4 = await interaction.followUp({ content: "Here we grab an emoji by its id", fetchReply: true });
        // Emoji must be a string or GuildEmoji/ReactionEmoji
        await message4.react(interaction.client.emojis.cache.get('1067024784057184266'));
    },
};