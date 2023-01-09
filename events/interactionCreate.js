const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		
		if (interaction.isChatInputCommand()) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
				console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}

		} else if (interaction.isAutocomplete()) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}

		} else if (interaction.isButton()) {
			console.log("a button!");
		} else if (interaction.isStringSelectMenu()) {
			console.log("a string select menu!");
		} else if (interaction.isUserSelectMenu()) {
			console.log("a user select menu!");
		} else if (interaction.isRoleSelectMenu()) {
			console.log("a role select menu!");
		} else if (interaction.isChannelSelectMenu()) {
			console.log("a channel select menu!");
		} else if (interaction.isMentionableSelectMenu()) {
			console.log("a mentionable select menu!");
		} else if (interaction.isModalSubmit()) {
			console.log("a modal!");
		} else if (interaction.isContextMenuCommand()) {
			//interaction.deferReply();
			if (interaction.isUserContextMenuCommand()) {
				console.log("an APP command(user)!");
			} else if (interaction.isMessageContextMenuCommand()) {
				console.log("an APP command(message)!");
			} else {
				// not an APP command
			}
			const command = interaction.client.commands.get(interaction.commandName);
			await command.execute(interaction);
		} else {
			// not a command
			console.error(`A new type of interaction detected. Please update your bot source code.`);
		}
	},
};