const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a role from the user.'),
    async execute(interaction) {
        const ROLE_NAME = 'Cool guy gang';
        const REMOVE_ROLE_EMOJI = '❎';
        const role = interaction.guild.roles.cache.find(role => role.name === ROLE_NAME);

        // Check that the role exists in the server
        if (!role) {
            console.error(`Could not find role with name ${ROLE_NAME} in guild ${interaction.guild.name}!`);
            return interaction.reply({ content: `Could not find role with name ${ROLE_NAME} in this server.`, ephemeral: true });
        }
        const member = interaction.guild.members.cache.find(member => member.id === interaction.user.id);

        // Check that the member exists in the server
        if (!member) {
            console.error(`Could not find member with id ${interaction.user.id} in guild ${interaction.guild.name}!`);
            return interaction.reply({ content: 'An error occurred while trying to remove the role: Could not find member.', ephemeral: true });
        }

        // Check if the member already hasn't the role
        if (!member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `You don't have the '${ROLE_NAME}' role.`, ephemeral: true });
        }

        const message = await interaction.reply({ content: `React with '${REMOVE_ROLE_EMOJI}' in 15 secs to remove the '${ROLE_NAME}' role.`, ephemeral: false, fetchReply: true });
        await message.react(REMOVE_ROLE_EMOJI);
        const filter = (reaction, user) => {
            return reaction.emoji.name === REMOVE_ROLE_EMOJI && user.id === interaction.user.id;
        };

        const collector = message.createReactionCollector({ filter, time: 15000 });
        collector.on('collect', async (_, user) => {

            // Remove the role from the member
            await member.roles.remove(role).catch(() => {
                collector.stop('error');
                return interaction.channel.send({ content: 'An error occurred while trying to remove the role.' });
            });
            console.log(`Removed role ${role.name} from ${user.tag} in ${interaction.guild.name}`);
            collector.stop('success');
            return interaction.channel.send({ content: `Removed role ${role.name} from ${user}` });
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'time') {
                //interaction.reply({ content: 'You did not react in time.', ephemeral: true });
            }
            await message.delete()
                .then(() => { })
                .catch(console.error);
        });
    },
};