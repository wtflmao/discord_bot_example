const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Boom')
        // There are two available options for the .type of ContextMenuCommandsBuilder
        // ApplicationCommandType.Message and ApplicationCommandType.User
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const targetMsgContent = (await interaction.channel.messages.fetch(interaction.targetId)).content;
        await interaction.reply(`Boom! ${targetMsgContent}`);
    },
};