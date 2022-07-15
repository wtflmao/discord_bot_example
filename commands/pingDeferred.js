const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout; // 注意这里！！！！！！

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping4')
		.setDescription('Replies with Pong, but deferred!'),
	async execute(interaction) {
	
	    // 延迟回复，此时会有个初始回复“应用程序正在响应”
	    await interaction.deferReply();
	    
	    // 利用导入的 wait，故意等待 4000 毫秒
		await wait(4000);
		
		// 进行真正的回复
		await interaction.editReply('Pong!');
	},
};