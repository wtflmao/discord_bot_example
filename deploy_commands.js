const fs = require("fs");  
const { REST } = require('@discordjs/rest');  
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];  
//const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const cmdPaths = require("./cmdPaths.js").data;
const commandFiles = [];
for (let i = 0; i < cmdPaths.length; i++) {
   commandFiles[i] = fs.readdirSync(cmdPaths[i]).filter(file => file.endsWith(".js")); // fs.readdirSync() 的结果是个数组，所以 commandFiles是个二维数组
   for (let j = 0; j < commandFiles[i].length; j++) {
      commandFiles[i][j] = cmdPaths[i] + "/" + commandFiles[i][j];
   }
}

//console.log(commandFiles);
for (const fileArray of commandFiles) {
   for (const file of fileArray) {
      console.log(file);
      let command = require(`./${file}`);
      commands.push(command.data.toJSON());

      // if any ‘aka' name exists
      if (command.akaNames != null && command.akaNames !== []) {
         for (let i = 0; i < command.akaNames.length; i++) {
            let akaData = command.data;
            akaData.name = command.akaNames[i];
            commands.push(akaData.toJSON());
         }
      }
   }
}  
  
const rest = new REST({ version: '10' }).setToken(token);
  
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })  
   .then(() => console.log('Successfully registered application commands.'))  
   .catch(console.error);