const { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selectmenu')
        .setDescription('Replies with a select menu!'),
    async execute(interaction) {

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select_1')
                    .setPlaceholder('Nothing selected')
                    .addOptions(
                        {
                            label: 'Las Vegas, NV',
                            description: 'This is a description',
                            value: 'Las_Vegas_NV_US',
                        },
                        {
                            label: 'Denver, CO',
                            description: 'This is also a description',
                            value: 'Denver_CO_US',
                        },
                    ),
            );

        const embed1 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Live Weather Report')
            .setURL('https://weather.com/weather/today/l/Las+Vegas+NV?canonicalCityId=8699c391df74aabce6a01ab22e01fd094d01ff77fcc7ef7e314ea4067fbc1066')
            .setDescription(`Las Vegas, NV\nAs of ${Math.floor(Math.random() * 11) + 1}:${10 + Math.floor(Math.random() * 49)} am PST\n38°F\nClear\nDay ${Math.floor(Math.random() * 10) + 55}°F • Night ${35 - Math.floor(Math.random() * 10)}°F`);
        const embed2 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Live Weather Report')
            .setURL('https://weather.com/weather/today/l/3f345b93f02bdea125a122a4798a6b17174a3153bb0f45b4d5238343613d7368')
            .setDescription(`Denver, CO\nAs of ${Math.floor(Math.random() * 11) + 1}:${10 + Math.floor(Math.random() * 49)} am PST\n25°F\nClear\nDay ${Math.floor(Math.random() * 10) + 47}°F • Night ${25 - Math.floor(Math.random() * 10)}°F`);

        await interaction.reply({ content: "Choose a city to see its weather report:", components: [row], embeds: [] });

        const filter = i => {
            return interaction.customId === 'select_1' && i.user.id === interaction.user.id;
        }

        const message = await interaction.fetchReply();
        const collector = message.createMessageComponentCollector(
            filter,
        );

        collector.on('collect', async i=> {
            await i.update({ content: 'Selected! Syncing the weather data...', components: [], embeds:[] });
            await wait(3750); // wait 3.75 secs to emulate the delay of the network
            const city = Array.from(i.values)[0];
            if (city === 'Las_Vegas_NV_US') {
                await i.editReply({content: "Here's your weather report!", embeds: [embed1], components: [row]});
            } else if (city === 'Denver_CO_US') {
                await i.editReply({content: "Here's your weather report!", embeds: [embed2], components: [row]});
            }
        });
    },
};