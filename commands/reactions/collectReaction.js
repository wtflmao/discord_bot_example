const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collectreact')
        .setDescription('Replies with reaction!'),
    async execute(interaction) {

        const message = await interaction.reply({ content: 'You can react with a thumbs UP or a thumbs DOWN.', fetchReply: true })
        message.react('👍').then(() => message.react('👎').then(() => message.react('😋')));
        const filter = (reaction, user) => {
            return (['👍', '👎','😋'].includes(reaction.emoji.name)) && (user.id === interaction.user.id);
        };

        const collector = message.createReactionCollector({ filter, time: 10000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji} from ${user}`);
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply("Nothing valid you've reacted.");
                return;
            }

            collected.forEach(reaction => {
                if (reaction.emoji.name === '👍') {
                    interaction.channel.send('You reacted with a thumbs UP.');
                } else if (reaction.emoji.name === '👎') {
                    interaction.channel.send('You reacted with a thumbs DOWN.');
                } else {
                    interaction.channel.send('You reacted with a YUM.');
                }
            })
        });
    },
};