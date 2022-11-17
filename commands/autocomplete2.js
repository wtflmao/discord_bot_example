const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autocomplete2')
		.setDescription('Multi-Autocomplete test.')
		.addStringOption(option =>
			option.setName("category")
				.setDescription("The category you'd like to dive in")
				.setAutocomplete(true)
				.setRequired(true))
		.addNumberOption(option =>
			option.setName("amount")
				.setDescription("How many you want")
				.setAutocomplete(true)
				.setRequired(true)),
	async autocomplete(interaction) {
		
		const focusedOption = interaction.options.getFocused(true);

		if(focusedOption.name === "category") {

			const choices = ['beer', 'coffee', 'milk', 'apple', 'banana', 'tea', 'zebra'];
			const filtered = choices.filter(choice => choice.includes(focusedOption.value));
			await interaction.respond(
				filtered.map(choice =>({ name: choice, value: choice })),
			).then(() => console.log('Successfully responded to the autocomplete interaction'))
	 		.catch(console.error);

		}

		if(focusedOption.name === "amount") {

			const choices = [12, 24, 48, 81, 9];
			const filtered = choices.filter(choice => `${choice}`.includes(`${focusedOption.value}`));
			await interaction.respond(
				filtered.map(choice =>({ name: `${choice}`, value: choice })),
			).then(() => console.log('Successfully responded to the autocomplete interaction'))
	 		.catch(console.error);
 		
		}
	},
	async execute(interaction) {
		const category = interaction.options.getString("category");
		const amount = interaction.options.getNumber("amount");
		// P.S. .getUser(), .getMember(), .getRole(), .getChannel(), .getMentionable() and .getAttachment() methods are not available to autocomplete interactions.
		// but .getBoolean(), .getInteger() are available
		await interaction.reply(`You acquired ${amount} ${category}.`);
	},
};