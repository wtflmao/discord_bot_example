const fs = require('node:fs');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
  
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
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);

            // if any 'aka' name exists
            if (command.akaNames != null && command.akaNames !== []) {
                for (let i = 0; i < command.akaNames.length; i++) {
                    client.commands.set(command.akaNames[i], command);
                }
            }
        } else {
            if ('data' in command) {
                console.log(`[WARNING] The command at ${file} is missing a required "execute" property.`);
            } else {
                console.log(`[WARNING] The command at ${file} is missing a required "data" property.`);
            }
        }

    }
}

client.once(Events.ClientReady, () => {});
client.on(Events.InteractionCreate, () => {});

client.login(token);