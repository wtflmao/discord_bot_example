const { SlashCommandBuilder } = require('discord.js');

module.exports = {  
	data: new SlashCommandBuilder()  
		.setName('collector1')  
		.setDescription('Collecting words till the word \"discord\"!'),  
	async execute(interaction) {
		interaction.reply("type discord");

		const filter = m => {
			return m.content.toLowerCase().includes('discord') && m.author.id === interaction.user.id
		} // m is a message object that will be passed through the filter function
		console.log(interaction.user.id);

		const collector = interaction.channel.createMessageCollector({
			filter,
			max: 1,
			time: 1000 * 10, //10 secs
		})
		//interaction.deferReply();
		collector.on('collect', m => {
			console.log(`Collected from ${m.author.id}`);
			m.reply("Yes!");
		});

		console.log("here333");
		collector.on('end', collected => {
			if (collected.size === 0) {
				interaction.channel.send(`<@${interaction.user.id}> You did not type discord.`)
					.then(message => console.log(`Sent message: <@${interaction.user.id}> You did not type discord.`))
					.catch(console.error);
				return
			}
			let text = 'Collected:\n';
			collected.forEach(m => {
				text += `${m.content}\n`
			})
			interaction.channel.send(text)
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
		})
	},  
};