const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multireact')
        .setDescription('Replies with reaction!'),
    async execute(interaction) {
        const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
        // "c u m" in order
        // the first way to do this is using serial .then() on the previous .react()
        await message.react('🇨')
            .then(() => message.react('🇺')
                .then(() => message.react('🇲')
                    .then(() => message.react('❗'))));

        const msg = await interaction.channel.send({ content: 'AHHhhhhhhHHHhh', fetchReply: true });
        // the second way to do this, is using paralleled .then() on the msg
        await msg.react('🇸')
            .then(() => msg.react('🇭'))
            .then(() => msg.react('🇮'))
            .then(() => msg.react('🇹'));

        // the third way to do this is using .react() multiple times
        const menu = await interaction.channel.send({ content: 'Library search result:\n\n\tThe Art of War, Sun Tzu, Filiquarian 2017, PDF\n\tMinecraft: The Shipwreck, C. B. Lee, Del Ray 2020, Paperback\n\tand more...\n\nPage 1/4', fetchReply: true });
        await menu.react('⬅️');
        await menu.react('1️⃣');
        await menu.react('2️⃣');
        await menu.react('3️⃣');
        await menu.react('4️⃣');
        await menu.react('➡️');
    },
};