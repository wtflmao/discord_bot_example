const { Events, Collection } = require('discord.js');
let cooldowns = new Collection();
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// we only need to check cooldown on a command, not on every single interaction
		if (interaction.isCommand()) {
			const command = await interaction.client.commands.get(interaction.commandName);

			if (!cooldowns.has(command.data.name)) {
				cooldowns.set(command.data.name, new Collection());
			}

			const now = Date.now(); // get current time
			const timestamps = await cooldowns.get(command.data.name);
			const defaultCooldownDuration = 0; // we set a DEFAULT value for those legacy command that didn't set a cooldown
			const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

			if (timestamps.has(interaction.user.id)) {
				const expirationTime = await timestamps.get(interaction.user.id) + cooldownAmount;
				if (now < expirationTime) {
					// not now, still wait
					const expiredTimestamp = Math.round(expirationTime / 1000);
					return interaction.reply({
						content: `Please wait for <t:${expiredTimestamp}:R> more time before reusing the \`${command.data.name}\` command.`,
						ephemeral: true
					});
				} else {
					// cooldown expired for that user, proceed

				}
			}

			// add a cooldown lock
			await timestamps.set(interaction.user.id, now);
			// wait and wait
			await setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
		}
		
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
			console.log(`A new type of interaction detected. Please update your bot source code.`);
		}
	},
};