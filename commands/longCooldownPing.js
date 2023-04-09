const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    // here we set a cooldown value to determine how long the user would have
    // to wait before using the command again, in seconds
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('coolping')
        .setDescription('Replies with Pong, but with a 15 secs cooldown!'),
    async execute(interaction) {
        await interaction.reply("Pong!");
        await interaction.followUp({
            content: `Next /coolping will be available in 15 seconds`,
            ephemeral: true,
        });
    },
};