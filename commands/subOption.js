const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giftest')
		.setDescription('MultiOption test.')
		.addStringOption(option =>
			option.setName("category")
				.setDescription("The choices category")
				.setRequired(true)
				.addChoices(
					{ name: 'Funny', value: 'gif_funny'},
					{ name: 'Meme', value: 'gif_meme'},
					{ name: 'Movie', value: 'gif_movie'}))
		.addIntegerOption(option =>
			option.setName("amount")
				.setDescription("The amount of gifs you want")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(5)),
	async execute(interaction) {
		const category = interaction.options.getString("category");
		await interaction.reply(category);
		console.log(interaction.options);
		for (var i=2; i <= interaction.options.getInteger("amount"); i++) {
			await interaction.followUp(category);
		}
	},
};