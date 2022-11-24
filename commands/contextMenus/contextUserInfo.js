const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
// DISCORD_EPOCH is a constant, being the 1st millisecond of 2015
const DISCORD_EPOCH = 1420070400000;

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('User Information')
        // There are two available options for the .type of ContextMenuCommandsBuilder
        // ApplicationCommandType.Message and ApplicationCommandType.User
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        // Discord snowflake is a 64-bit number. In practice, it's stored as a String.
        // We cast the snowflake value interaction.targetId to BigInt
        // The most significant 42 bits of data is called "Timestamp"
        // 42-bit "Timestamp" records milliseconds since Discord Epoch, the first millisecond of 2015 or 1420070400000.
        // The other 22 bits are not helpful to time conversion, so just discard them.
        const milliseconds = BigInt(interaction.targetId) >> BigInt(22);
        // Sum up DISCORD EPOCH with Timestamp to find the UNIX millisecond timestamp
        // then we convert the timestamp into a human-readable date string
        let date = new Date(Number(milliseconds) + DISCORD_EPOCH)
        await interaction.reply(`${interaction.targetUser.username}#${interaction.targetUser.discriminator} @ ${date}`);
    },
};