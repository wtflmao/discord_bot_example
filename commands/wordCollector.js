const { SlashCommandBuilder } = require('@discordjs/builders');  

module.exports = {  
	data: new SlashCommandBuilder()  
		.setName('collector1')  
		.setDescription('Collecting words till the word \"discord\"!'),  
	async execute(interaction) {  
		// `m` is a message object that will be passed through the filter function
		//const filter = m => m.content.includes('discord');
		//const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

		client.on('message', message => {
			if (message.content == `!collect`) {
				// Create a message collector
				const filter = m => (m.content.includes('discord') && m.author.id != client.user.id);
				const channel = message.channel;
				const collector = channel.createMessageCollector(filter, { time: 10000 });
				console.log("collector started");
				collector.on('collect', m => console.log(`Collected ${m.content}`));
				collector.on('end', collected => console.log(`Collected ${collected.size} items`));
 			}
		});
	},  
};