const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout; // 别忘了！！！

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping3')
		.setDescription('Replies with Pong, but will be edited.'),
    
	async execute(interaction) {

        // 先来个回复，作为初始回复
		await interaction.reply("Pong!");

        // 利用 wait 等待 2000 毫秒，即 2 秒
		await wait(2000);

        // 修改回复成新的字符串
		await interaction.editReply('Pong again!');
		},
};