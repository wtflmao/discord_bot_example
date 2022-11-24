const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Boom')
        // There are two available options for the .type of ContextMenuCommandsBuilder
        // ApplicationCommandType.Message and ApplicationCommandType.User
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        // The interaction here is ContextMenuInteraction, also to be specific, it is UserContextMenuInteraction
        // UserContextMenuInteraction has a field called ".targetId", which is the Discord snowflake id of the target of this interaction
        // Here we use interaction.channel.messages.fetch(interaction.targetId)) to get Message by id
        // Then we pull out the content of it to targetMsgContent
        const targetMsgContent = (await interaction.channel.messages.fetch(interaction.targetId)).content;
        await interaction.reply(`Boom! ${targetMsgContent}`);
    },
};