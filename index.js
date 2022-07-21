const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');  
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, 1<<15] });
  
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));  
  
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();
const cmdPaths = require("./cmdPaths.js").data;
const commandFiles = [];
for (let i = 0; i < cmdPaths.length; i++) {
    commandFiles[i] = fs.readdirSync(cmdPaths[i]).filter(file => file.endsWith(".js")); // fs.readdirSync() 的结果是个数组，所以 commandFiles是个二维数组
    for (let j = 0; j < commandFiles[i].length; j++) {
        commandFiles[i][j] = cmdPaths[i] + "/" + commandFiles[i][j];
    }
}

for (const fileArray of commandFiles) {
    for (const file of fileArray) {
        const command = require(`./${file}`);
        client.commands.set(command.data.name, command);

        // if any ‘aka' name exists
        if (command.akaNames != null && command.akaNames !== []) {
            for (let i = 0; i < command.akaNames.length; i++) {
                client.commands.set(command.akaNames[i], command);
            }
        }
    }
}

client.once('ready', () => {});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

client.login(token);