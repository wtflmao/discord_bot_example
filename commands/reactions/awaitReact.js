const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('awaitreact')
        .setDescription('Replies with reaction!'),
    async execute(interaction) {

        const message = await interaction.reply({ content: 'You can react with a thumbs UP or a thumbs DOWN.', fetchReply: true })
        message.react('👍').then(() => message.react('👎').then(() => message.react('😋')));
        const filter = (reaction, user) => {
            return (['👍', '👎','😋'].includes(reaction.emoji.name)) && (user.id === interaction.user.id);
        };

        await message.awaitReactions({ filter, time: 10000, errors: ['time'] })
            .then(collected => {
                collected.forEach(reaction => {
                    if (reaction.emoji.name === '👍') {
                        interaction.channel.send('You reacted with a thumbs UP.');
                    } else if (reaction.emoji.name === '👎') {
                        interaction.channel.send('You reacted with a thumbs DOWN.');
                    } else {
                        interaction.channel.send('You reacted with a YUM.');
                    }
                })
            })
            .catch(() => {
                interaction.channel.send("Nothing valid you've reacted.");
            });
    },
};