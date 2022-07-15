const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping2')
		.setDescription('Replies with Pong, but ephemerally!'),
	async execute(interaction) {
	    // 这里回复了斜杠命令，是个短暂回复
		await interaction.reply({
		    content: "Pong!",
		    ephemeral: true,
		});
	},
};