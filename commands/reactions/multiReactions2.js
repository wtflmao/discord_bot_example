const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multireact2')
        .setDescription('Replies with reaction!'),
    async execute(interaction) {
        const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });

        Promise.all([
            message.react('🇨'),
            message.react('🇺'),
            message.react('🇲'),
            message.react('❗'),
            message.react('🇸'),
            message.react('🇭'),
            message.react('🇮'),
            message.react('🇹'),
        ])
            .catch(error => console.error('One of the emojis failed to react:', error));
    },
};