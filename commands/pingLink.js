const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping6')
		.setDescription('Replies with Pong, but with hyperlink!'),
	async execute(interaction) {
		await interaction.reply(
		    "Pong!\n" + "[bilibili](https://www.bilibili.com/video/BV1GJ411x7h7)"
		);
	},
};