const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const DISCORD_EPOCH = 1420070400000;

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('User Information')
        // There are two available options for the .type of ContextMenuCommandsBuilder
        // ApplicationCommandType.Message and ApplicationCommandType.User
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const milliseconds = BigInt(interaction.targetId) >> BigInt(22);
        let date = new Date(Number(milliseconds) + DISCORD_EPOCH)
        await interaction.reply(`${interaction.targetUser.username}#${interaction.targetUser.discriminator} @ ${date}`);
    },
};