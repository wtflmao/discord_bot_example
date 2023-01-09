const { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multiselect')
        .setDescription('Replies with a multi-select menu!'),
    async execute(interaction) {

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select_1')
                    .setPlaceholder('Nothing selected')
                    // here we demand our friendly user to choose more than 2 options while less than 4 options
                    .setMinValues(2)
                    .setMaxValues(4)
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
                        {
                            label: 'Houston, TX',
                            description: 'This is also a description',
                            value: 'Houston_TX_US',
                        },
                        {
                            label: 'Seattle, WA',
                            description: 'This is also a description',
                            value: 'Seattle_WA_US',
                        },
                        {
                            label: 'Salt Lake City, UT',
                            description: 'This is also a description',
                            value: 'Salt_Lake_City_UT_US',
                        },
                    ),
            );

        const embed1 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Las Vegas\nCity in Nevada')
            .setDescription(`Las Vegas, often known simply as Vegas, is the 25th-most populous city in the United States, the most populous city in the state of Nevada, and the county seat of Clark County. The city anchors the Las Vegas Valley metropolitan area and is the largest city within the greater Mojave Desert.\n` +
                `Sales tax: 8.38%\n` +
                `Time zone: Pacific Standard Time, GMT-8`);
        const embed2 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Denver\nCity in Colorado')
            .setDescription(`Denver, the capital of Colorado, is an American metropolis dating to the Old West era. Larimer Square, the city’s oldest block, features landmark 19th-century buildings. Museums include the Denver Art Museum, an ultramodern complex known for its collection of indigenous works, and the mansion of famed Titanic survivor Molly Brown. Denver is also a jumping-off point for ski resorts in the nearby Rocky Mountains.\n` +
                `Sales tax: 8.81%\n` +
                `Time Zone: Mountain Standard Time, GMT-7`);
        const embed3 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Houston\nCity in Texas')
            .setDescription(`Houston is a large metropolis in Texas, extending to Galveston Bay. It’s closely linked with the Space Center Houston, the coastal visitor center at NASA’s astronaut training and flight control complex. The city’s relatively compact Downtown includes the Theater District, home to the renowned Houston Grand Opera, and the Historic District, with 19th-century architecture and upscale restaurants.\n` +
                `Sales tax: 8.25%\n` +
                `Time zone: Central Standard Time, GMT-6`);
        const embed4 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Seattle\nCity in Washington State')
            .setDescription(`Seattle, a city on Puget Sound in the Pacific Northwest, is surrounded by water, mountains and evergreen forests, and contains thousands of acres of parkland. Washington State’s largest city, it’s home to a large tech industry, with Microsoft and Amazon headquartered in its metropolitan area. The futuristic Space Needle, a 1962 World’s Fair legacy, is its most iconic landmark.\n` +
                `Sales tax: 10.25%\n` +
                `Time zone: Pacific Standard Time, GMT-8`);
        const embed5 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Salt Lake City\nCity in Utah')
            .setDescription(`Salt Lake City is the capital and most populous city of Utah, as well as the seat of Salt Lake County, the most populous county in Utah. With a population of 200,133 in 2020, the city is the core of the Salt Lake City metropolitan area, which had a population of 1,257,936 at the 2020 census.\n` +
                `Sales tax: 7.75%\n`+
                `Time zone: Mountain Standard Time, GMT-7`);

        await interaction.reply({ content: "Choose 2-4 cities to make your very own vacation destination list:", components: [row], embeds: [] });

        const filter = i => {
            return interaction.customId === 'select_1' && i.user.id === interaction.user.id;
        }

        const collector = interaction.channel.createMessageComponentCollector(
            filter,
        );

        collector.on('collect', async i=> {
            await i.update({ content: 'Selected! Fetching the detailed data relating to your choices...', components: [], embeds:[] });
            await wait(3150); // wait 3.15 secs to emulate the delay of the network
            await i.editReply({content: "Here's your detailed descriptions related to your choices!", embeds: [], components: []});

            const cityArr = Array.from(i.values);
            if (cityArr.includes('Las_Vegas_NV_US')) {
                await i.followUp({content: "", embeds: [embed1], components: []});
            }
            if (cityArr.includes('Denver_CO_US')) {
                await i.followUp({content: "", embeds: [embed2], components: []});
            }
            if (cityArr.includes('Houston_TX_US')) {
                await i.followUp({content: "", embeds: [embed3], components: []});
            }
            if (cityArr.includes('Salt_Lake_City_UT_US')) {
                await i.followUp({content: "", embeds: [embed4], components: []});
            }
            if (cityArr.includes('Seattle_WA_US')) {
                await i.followUp({content: "", embeds: [embed5], components: []});
            }
        });
    },
};