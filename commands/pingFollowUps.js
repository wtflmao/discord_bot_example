const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping5')
		.setDescription('Replies with Pong, but multiple responses!'),
	async execute(interaction) {
		await interaction.reply("Pong!");
		await interaction.followUp({content: "Pong again!", ephemeral: true});
		await interaction.followUp({content: "Pong again again!", ephemeral: false});
	},
};