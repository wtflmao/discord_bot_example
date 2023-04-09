const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        // you can set localized names in bulk
        .setNameLocalizations({
            'en-GB': 'hello2',
            'zh-CN': '你好',
            'zh-TW': '你好',
            'cs': 'ahoj',
            'ru': 'привет',
            'ko': '안녕하세요',
            'es-ES': 'hola'
        })
        .setDescription('Replies with hello, but in localized response!')
        // you can set localized descriptions in bulk
        .setDescriptionLocalizations({
            'zh-TW': '回复你好，但以本地化回复！',
            'cs': 'Odpovědi ahoj, ale v lokalizované odpovědi!',
            'en-GB': 'Replies with hello, but in localized response2!',
            'es-ES': '¡Responde con hola, pero en respuesta localizada!',
            'ko': '안녕하세요로 회신하지만 현지화된 응답으로!',
            'zh-CN': '回复你好，但以本地化回复！',
            'ru': 'Отвечает приветствием, но локализованным ответом!'
        })
    ,
    async execute(interaction) {
        const HelloWorldLocales = {
            'zh-CN': '你好世界！',
            'en-GB': 'Hello world2!',
            'zh-TW': '你好世界！',
            'cs': 'Ahoj světe',
            'ko': '안녕 세상!',
            'es-ES': '¡Hola Mundo!',
            'ru': 'Привет, мир!',
        };

        const eatLocales = {
            'en-GB': 'Eat2',
            'zh-CN': '吃',
            'es-ES': 'Comer'
        }
        const sleepLocales = {
            'zh-CN': '睡觉',
            'es-ES': 'Dormir'
        }

        // add two buttons that are absolutely useless
        // just a localization example
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`b1`)
                    .setLabel(eatLocales[interaction.locale] ?? 'Eat')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`b2`)
                    .setLabel(sleepLocales[interaction.locale] ?? 'Sleep')
                    .setStyle(ButtonStyle.Danger),
            );

        // default is English: Hello world!
        await interaction.reply({
            content: `${HelloWorldLocales[interaction.locale] ?? 'Hello world!'}, locale:(${interaction.locale}})`,
            components: [row]
        });
    },
};