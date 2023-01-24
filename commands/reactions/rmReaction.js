const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rmreact')
        .setDescription('Replies with reaction!'),
    async execute(interaction) {

        const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
        await message.react('😄');
        await message.react('🆒');
        await message.react('😃');
        await message.react('😕');

        message.reactions.cache.get('🆒').remove()
            .catch(error => console.error('Failed to remove reactions:', error));
    },
};