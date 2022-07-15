const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping7')
		.setDescription('Replies with Pong, and fetch!'),
	async execute(interaction) {
	    await interaction.reply("Pong!");
		const message = await interaction.fetchReply();
		console.log(message); // 控制台输出抓取的消息对象本身
	},
};