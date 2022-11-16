# discord_bot_example

built with [discord.js v14](https://github.com/discordjs/discord.js)

some reference docs can be found here: [blog link](https://www.cnblogs.com/hhzm/)

remember to create a config.json in the project root directory to make it works!

config.json looks like this:
```json
{  
   "token": "bot-token-goes-here",  
   "clientId": "bot-clientid-goes-here",  
   "guildId": "serverid-goes-here"  
}
```

After that config.json thingy, use the following lines to deploy your slash commands.
```shell
cd discord_bot_example
node deploy_commands.js
```

If succeeded, use the following lines to start your bot.
```shell
node .
```
or
```shell
node index.js
```
