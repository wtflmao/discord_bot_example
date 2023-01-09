const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Replies with embed!'),
    async execute(interaction) {
        // This EmbedBuilder() has to be inside a command or listener
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xC1F8C0)
            .setTitle('标题标题')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: '作者名字', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            .setDescription('这里给出一些介绍')
            .setThumbnail('https://i.imgur.com/fwO0TqB.jpeg')
            .addFields(
                { name: '普通域标题', value: 'Some value here1' },
                { name: '普通域标题', value: 'Some value here11，下面那个是空白域' },
                // add a blank field in the embed
                { name: '\u200B', value: '\u200B' },
                { name: '内联域标题1', value: 'Some value here111', inline: true },
                { name: '内联域标题2', value: 'Some value here3', inline: true },
            )
            .addFields({ name: '内联域标题3', value: 'Some value here4', inline: true })
            .setImage('https://i.imgur.com/yA1u8wt.jpeg')
            // .setTimestamp() accept a Number, a null or a Date value
            .setTimestamp()
            .setFooter({ text: '页脚文字', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        await interaction.reply({ content: "Here's an embed example", embeds: [exampleEmbed] });

        // directly use a JSON object to represent an embed
        const embed2json = {
            color: 0xC1F8C0,
            title: '标题标题',
            url: 'https://discord.js.org/',
            author: {
                name: '作者名字',
                url: 'https://discord.js.org',
                icon_url: 'https://i.imgur.com/AfFp7pu.png'
            },
            description: '这里给出一些介绍',
            thumbnail: { url: 'https://i.imgur.com/fwO0TqB.jpeg' },
            fields: [
                { name: '普通域标题', value: 'Some value here1' },
                { name: '普通域标题', value: 'Some value here11，下面那个是空白域' },
                { name: '​', value: '​' },
                { name: '内联域标题1', value: 'Some value here111', inline: true },
                { name: '内联域标题2', value: 'Some value here3', inline: true },
                { name: '内联域标题3', value: 'Some value here4', inline: true }
            ],
            image: { url: 'https://i.imgur.com/yA1u8wt.jpeg' },
            // here timestamp field only accepts ISO8601 number or string
            timestamp: (new Date()).toISOString(),
            footer: { text: '页脚文字', icon_url: 'https://i.imgur.com/AfFp7pu.png' }
        };
        await interaction.channel.send({ embeds: [embed2json] });

        const simpleEmbed = new EmbedBuilder()
            .setTitle('Columbus, Ohio: Weather report')
            .setURL('https://weather.com/weather/today/l/8db513f8f8993797550b32062dfa5d4d83dd97b28ad0b55ec0033a14fe58a86dc0163883d8c5bf8f66aa6173005f3ebc')
            .setThumbnail('https://i.imgur.com/sRwMnNA.jpeg')
            .setDescription('31 °F\nMostly Cloudy')
            .setFields(
                { name:'High', value: '41 °F', inline: true},
                { name:'Low', value: '28 °F', inline: true},
            );
        await interaction.channel.send({ content: "Here's a simple embed", embeds: [simpleEmbed] });
    },
};