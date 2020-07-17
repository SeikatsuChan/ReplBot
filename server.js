const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Thanks for pinging me <3')
})

function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}
////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")
const prefix = config.prefix;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if(message.author.bot || !message.content.startsWith(config.prefix)) return
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  /* EVAL COMMAND */
  if(command === "eval" && message.author.id === config.owner) {
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  ////////////////////////////////////////////////////////////////////////
  
});
keepAlive();
client.login(process.env.TOKEN);
