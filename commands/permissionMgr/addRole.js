const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds a role to the user.'),
    async execute(interaction) {
        const ROLE_NAME = 'Cool guy gang';
        const ADD_ROLE_EMOJI = '✅';

        const role = interaction.guild.roles.cache.find(role => role.name === ROLE_NAME);

        // Check that the role exists in the server
        if (!role) {
            console.error(`Could not find role with name ${ROLE_NAME} in guild ${interaction.guild.name}!`);
            return interaction.reply({ content: `Could not find role with name ${ROLE_NAME} in this server.`, ephemeral: true });
        }

        const message = await interaction.reply({ content: `React with '${ADD_ROLE_EMOJI}' in 15 secs to receive the '${ROLE_NAME}' role.`, ephemeral: false, fetchReply: true });

        await message.react(ADD_ROLE_EMOJI);

        const filter = (reaction, user) => {
            return reaction.emoji.name === ADD_ROLE_EMOJI && user.id === interaction.user.id;
        };

        const collector = message.createReactionCollector({ filter, time: 15000 });

        collector.on('collect', async (_, user) => {
            const member = interaction.guild.members.cache.find(member => member.id === user.id);
            // Check that the member exists in the server
            if (!member) {
                console.error(`Could not find member with id ${user.id} in guild ${interaction.guild.name}!`);
                collector.stop('error');
                return interaction.channel.send({ content: 'An error occurred while trying to add the role: Could not find member.' });
            }

            // Add the role to the member
            await member.roles.add(role).catch(() => {
                collector.stop('error');
                return interaction.channel.send({ content: 'An error occurred while trying to add the role.' });
            });

            console.log(`Added role ${role.name} to ${user.tag} in ${interaction.guild.name}`);
            collector.stop('success');
            return interaction.channel.send({ content: `Added role ${role.name} to ${user}` });
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'time') {
                //return interaction.channel.send({ content: 'You did not react in time.', ephemeral: true });
            }
            await message.delete()
                .then(() => { })
                .catch(console.error);
        });


    },
};