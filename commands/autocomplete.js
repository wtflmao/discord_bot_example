const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autocomplete')
		.setDescription('Autocomplete test.')
		.addStringOption(option =>
			option.setName("category")
				.setDescription("The category you'd like to dive in")
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		
		const focusedValue = interaction.options.getFocused();
		const choices = ['beer', 'coffee', 'milk', 'apple', 'banana', 'tea', 'zebra'];
		const filtered = choices.filter(choice => choice.includes(focusedValue));
		await interaction.respond(
			filtered.map(choice =>({ name: choice, value: 'v_' + choice })),
		).then(() => console.log('Successfully responded to the autocomplete interaction'))
 		.catch(console.error);
	},
	async execute(interaction) {
		const category = interaction.options.getString("category");
		await interaction.reply(`You acquired some ${category}.`);
	},
};