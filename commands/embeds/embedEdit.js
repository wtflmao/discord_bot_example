const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embededit')
        .setDescription('Replies with embed!'),
    async execute(interaction) {
        const infoLogoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOsaJUWS9y-_JQWtIggodoouMyxM-lJyPa1Q&usqp=CAU";

        // This EmbedBuilder() has to be inside a command or listener
        const embed = new EmbedBuilder()
            .setTitle('Resource Usage Panel')
            .setColor(0x955F20)
            .setThumbnail('https://i.imgur.com/rVtny54.jpeg')
            .setDescription('\u200B')
            .addFields(
                { name: 'CPU Usage', value: '14 %', inline: true },
                { name: 'Memory Usage', value: '70 %', inline: true },
            )
            .setTimestamp()
            .setFooter({ text: 'Updated 0 second ago', iconURL: infoLogoUrl })

        await interaction.reply({ embeds: [embed], content: `${(new Date()).toISOString()}` });


        // generate a random number between 2 - 9
        let time = 2 + Math.floor(8 * Math.random());
        await wait(time * 1000);

        // fetch the reply we just replied
        const message = await interaction.fetchReply();

        // build an embed from the reply we just replied
        const receivedEmbed = message.embeds[0];
        const newEmbed = EmbedBuilder.from(receivedEmbed)
            .setFields(
                { name: 'CPU Usage', value: `${Math.floor(100 * Math.random())} %`, inline: true },
                { name: 'Memory Usage', value: `${Math.floor(100 * Math.random())} %`, inline: true },
            )
            .setFooter({ text: `Updated ${time} seconds ago`, iconURL: infoLogoUrl });

        await message.edit({ embeds: [newEmbed], content: `${(new Date()).toISOString()}` })
        //await interaction.editReply();


        // generate a random number between 2 - 9
        time = 2 + Math.floor(8 * Math.random());
        await wait(time * 1000);

        // send a new one
        const newEmbed2 = EmbedBuilder.from(newEmbed)
            .setDescription("Connection lost")
            .setFields(
                { name: 'CPU Usage', value: `N/A`, inline: true },
                { name: 'Memory Usage', value: `N/A`, inline: true },
            )
            .setFooter({ text: `Updated ${time} seconds ago`, iconURL: infoLogoUrl });

        // just delete the reply message and instantly send a new one into the same channel
        await interaction.deleteReply();
        await interaction.channel.send({ embeds: [newEmbed2], content: `${(new Date()).toISOString()}` });
    },
};