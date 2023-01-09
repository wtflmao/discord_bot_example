const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedattachment')
        .setDescription('Replies with embed!'),
    async execute(interaction) {
        // the "./" directory is the "discord_bot_example"
        const dogeCoffee = new AttachmentBuilder('assets/dogeCoffee.jpg');
        const githubIcon = new AttachmentBuilder('assets/githubIcon.jpg');

        // This EmbedBuilder() has to be inside a command or listener
        const embed = new EmbedBuilder()
            .setTitle('embed with image attachments')
            .setThumbnail('attachment://githubIcon.jpg')
            .setDescription('Github')
        await interaction.reply({ embeds: [embed], files: [githubIcon]});

        // directly use a JSON object to represent an embed
        const embed2json = {
            title: 'A cup of coffee',
            image: {
                url: 'attachment://dogeCoffee.jpg',
            },
        };
        const embed2 = new EmbedBuilder(embed2json);
        await interaction.channel.send({ embeds: [embed2], files: [dogeCoffee]});

        // mix up two existing constant embeds
        const embed3 = new EmbedBuilder()
            .setTitle(embed.toJSON().title + embed2json.title)
            .setImage(embed2.toJSON().image.url)
            .setThumbnail(embed.toJSON().thumbnail.url)
            .setDescription("Ahhh");
        await interaction.channel.send({ embeds: [embed3], files: [dogeCoffee, githubIcon]});
    },
};