# discord_bot_example

Built with [Discord.js v14.7.1](https://discord.js.org/#/docs/discord.js/main/general/welcome)

Some reference docs can be found here: [My Blog](https://www.cnblogs.com/hhzm/)

First thing first, git clone this project:
```shell
git clone https://github.com/wtflmao/discord_bot_example.git
```

Then, create a config.json in the directory `discord_bot_example`.

- `config.json` looks like this:
    ```json
    {  
       "token": "bot-token-goes-here",  
       "clientId": "bot-clientid-goes-here",  
       "guildId": "serverid-goes-here"  
    }
    ```
  - If you don't know what a "bot token" is, then I guess you haven't created your own discord application yet.

      Go to [Discord Developer Portal](https://discord.com/developers/applications) to set up your first very own application and add a very new bot to it.
  - clientId is your bot's snowflake id.
  - guildId is your server's snowflake id.

After setting up that config.json thingy, you should run the following command to install discord.js:
```shell
cd discord_bot_example
```

```shell
npm install discord.js@v14.7.1
```

Then, use the following lines to deploy your commands.
```shell
node deploy_commands.js
```

Then ,use the following command to start your bot.
```shell
node .
```
or
```shell
node index.js
```
   
That's all. 

Btw, my bot was built just for myself learning purpose, it isn't production-ready.
I do NOT provide any warranty for this project.