const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('subcmd')
		.setDescription('Subcommand! Reply with user\'s or server \'s info.')
		.addSubcommand(subcommand => 
			subcommand.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand.setName('server')
			.setDescription('Info about the server')),

	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') {
			const theUser = interaction.options.getUser('target');

			if (theUser) {
				await interaction.reply(`Username: ${theUser.username}\nID: ${theUser.id}`);
			} else {
				// 用户没有指定 target user，我们输出命令发起者自己就好
				await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		}
	},
};