const { token, DEFAULT_PREFIX } = require("./config.json");
const config = require("./config.json");
const { badwords } = require("./data.json") 
//const { config } = require("dotenv");
const fs = require("fs")
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: true 
  
 
});

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 4, 
	kickThreshold: 5,
	banThreshold: 6,
	maxInterval: 5000, 
	warnMessage: '{@user}, stop spam.', 
	kickMessage: '**{user_tag}** tes kick pour spam bouffon.',
	banMessage: '**{user_tag}** tes ban pour spam.',
	maxDuplicatesWarning: 7,
	maxDuplicatesKick: 10, 
	maxDuplicatesBan: 12, 
	exemptPermissions: [ 'ADMINISTRATOR'], 
	ignoreBots: true, 
	verbose: true, 
	ignoredUsers: [],
});


client.on('message', async message => {
  let prefix;
      try {

          antiSpam.message(message)
          let fetched = await db.fetch(`prefix_${message.guild.id}`);
          if (fetched == null) {
              prefix = (`${prefix}`)
          } else {
              prefix = fetched
          }
      } catch (e) {
          console.log(e)
  };
  try {
      

      if (message.mentions.has(bot.user) && !message.mentions.has(message.guild.id)) {
          return message.channel.send(`**Mon prefix est - \`${prefix}\`**`)
      }
  } catch {
      return;
  };
});

const db = require("quick.db");
const { addexp } = require("./handlers/xp.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.snipes = new Map();
const DBL = require("dblapi.js");
const kick = require("./commands/mod/kick");
const owner = require("./commands/owner/owner");




["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on('messageDelete', async (message) => {
  db.set(`snipemsg_${message.channel.id}`, message.content)
  db.set(`snipesender_${message.channel.id}`, message.author.id)
})


client.users.cache.random() 





//commandes dm all by yanis
client.on("message", message => {

  if (message.content.startsWith('+dm')) {
    if (message.author.id != 493416678429032500) { //Defines the bot Owner.
      return message.reply(':x: calmer vous, vous ne pouvez pas l’utiliser')
    }
    else {
      message.delete
      args = message.content.split(" ").slice(1);
      var argresult = args.join(' ');

      message.guild.members.cache.forEach(member => {
        member.send(argresult).then(console.log(`[+] Successfully Messaged | ${member.user.username}#${member.user.discriminator}`)).catch(e => console.error(`[-] Le membre peut avoir désactivé DM | ${member.user.username}#${member.user.discriminator}`));
      })
      console.log(`[/] Successfull.`)
      message.channel.send(`:white_check_mark: | **[$] Protect#7512**\n  **le dm a bien était envoyer** par ʏǟռɨֆ#4245 **JE SUIS LE PLUS FORT** :angry: :heart:`).then(message.delete({ timeout: 4000 }));
    }
  }

})
//fin dm all 


//bl
client.on("message", async (message,member) => {
let bl = db.fetch(`bl_${message.author.id}`)
    
    if(bl == true) return

  
})

//reaction event 
client.on('messageReactionAdd', async (reaction, user) => {
  const handleStarboard = async () => {
      const starboard = reaction.message.guild.channels.cache.get(db.fetch(`starboard_${reaction.message.guild.id}`,))
      const msgs = await starboard.messages.fetch({ limit: 100 });
      const embed = new Discord.MessageEmbed()
      embed.setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
      embed.setDescription(reaction.message.content)
      embed.setTimestamp()
      embed.setFooter(`🌟 | ${reaction.message.id}` , client.user.displayAvatarURL())
      embed.setColor('#edff00')
      if(starboard)
          starboard.send(embed)
      else {
          const embed = new Discord.MessageEmbed()
          embed.setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
          embed.setDescription(reaction.message.content)
          embed.setTimestamp()
          embed.setFooter(`🌟 | ${reaction.message.id}` , client.user.displayAvatarURL())
          embed.setColor('#edff00')
          if(starboard)
          starboard.send(embed)
      }
  }
  if(reaction.emoji.name === '🌟') {

      if(reaction.message.channel.id === db.fetch(`starboard_${reaction.message.guild.id}`,)) return;
      if(reaction.message.partial) {
          await reaction.fetch();
          await reaction.message.fetch();
          handleStarboard();
      }
      else
          handleStarboard();
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  const handleStarboard = async () => {
    const starboard = reaction.message.guild.channels.cache.get(db.fetch(`starboard_${reaction.message.guild.id}`,))
    const msgs = await starboard.messages.fetch({ limit: 100 });
      const existingMsg = msgs.find(msg => 
          msg.embeds.length === 1 ? 
          (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
      if(existingMsg) {
          if(reaction.count === 0)
              existingMsg.delete({ timeout: 2500 });
          else
              existingMsg.edit(`${reaction.count} - 🌟`)
      };
  }
})

//antilink by yanis


client.on("message", async (message , args) => {
  const db = require("quick.db")
 const Discord = require("discord.js");

 const pub = [
  "discord.me",
  "discord.io",
  "discord.gg",
  "invite.me",
  "discordapp.com/invite",
  ".gg"
];
                         

 if (pub.some(word => message.content.includes(word))) {
  if (message.member.hasPermission("ADMINISTRATOR")) {
      return;
  } 
let link = db.fetch(`al_${message.guild.id}`)

if(link === null) {
  return;
}
if(link === true){

  message.delete()
  const droit = new Discord.MessageEmbed()
  .setDescription(` Désolé mais nous n'acceptons pas la pub ici ${message.author}`)
  .setFooter('Anti pub on!')
  .setTimestamp() 
message.channel.send(droit)
}}

})












// fin de l'antilink

client.on('guildMemberAdd', member => {
    
  let guild = member.guild;
let maxMembers = 5; //Nombres de membres max
let maxTime = 15000; //temps en millisecondes 1000ms = 1s

let last10Members = guild.members.cache.filter(member => member.joinedAt <= (Date.now() - maxTime)) //Prendre les 10 derniers membres qui sont arrivés y'a 10 secondes

if(last10Members.size > maxMembers) return;
  console.log(last10Members.map(r => r.user.tag))

last10Members.forEach(member => {
member.kick({reason: "Anti mass-join"})
})
})

// antijoin debut

client.on('guildMemberAdd', async (member,channel) => {
  const db = require("quick.db")
  const Discord = require("discord.js");
 

                          
 
let link = db.fetch(`antiraid_${member.guild.id}`)

 if(link === null) {
   return           

 }
 if(link === true){
  if (member.user) member.kick({reason: "Antijoin"});
  console.log(`1 personne a était kick sur ${member.guild.name} pendant que le mode antijoin était activer`)

 }})


 //antibot 

 client.on('guildMemberAdd', async (member,channel,message) => {
  const db = require("quick.db")
  const Discord = require("discord.js");
 

                          
 
let link = db.fetch(`antibot_${member.guild.id}`)

 if(link === null) {
   return           

 }
 if(link === true){


 
  if (member.user.bot) member.ban({reason: "Antibot"});
  console.log(`un bot ${(member.user)} a était ban sur ${(member.guild.name)} pendant que le mode antibot était activer`)

 }})


 
//antichannel

client.on('channelCreate', async (channel) => {
 

let link = db.fetch(`antich_${channel.guild.id}`)

if(link === null) {
  return           

}
if(link === true){
 
  let owner = db.get(`owner_${channel.id}`, 1)
  if(owner) return
  
  const audit = (await channel.guild.fetchAuditLogs({
      limit: 1,
      type: 'CHANNEL_CREATE'
    })).entries.first();
    if(audit.action === 'CHANNEL_CREATE') {
    

     
      
        channel.delete();
     
        
     
    }
  }
  
})



  


//statut bot

client.on('ready', () => {
console.clear()
console.log(`${config.name} ・ON`)
client.user.setActivity(`${config.name}・[ON]`,  { type:"STREAMING", url: "https://www.twitch.tv/twitch_yanis" })
})

client.on("guildCreate", guild => {
db.set(`config_autogban_${guild.id}`, 'off')
db.set(`config_antilien_${guild.id}`, 'off')
db.set(`config_antiinsulte_${guild.id}`, 'off')

})

client.on("guildDelete", guild => {
db.set(`config_autogban_${guild.id}`, 'off')
db.set(`config_antilien_${guild.id}`, 'off')
db.set(`config_antiinsulte_${guild.id}`, 'off')

})



//antiwebhook
client.on('webhookUpdate', async (channel ,message) => {
  const db = require("quick.db")
  const Discord = require("discord.js");
 

                          
  getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

  channel.guild.fetchAuditLogs({limit: 1, type: "WEBHOOK_CREATE"}).then(data => {
let link = db.fetch(`antiwb_${channel.guild.id}`)
 
 if(link === null) {
   return           

 }
 if(link === true){

  const chanPosition = channel.position;
  channel.delete().then(() => {
      channel.clone().then(value => {
          value.setPosition(chanPosition).then(() => {
            
            const value = data.entries.first();
            if (value && value.executor) {
                const member = channel.guild.members.cache.get(value.executor.id);
                if (member)
                    member.kick().catch(reason => console.error(reason.message)).then(() => 
                    console.log(`j'ai suprimmé tout les webhooks :)`),
          )} }).catch(err => console.error(err.message))

                  }).catch(err => console.error(err))
          }).catch(err => console.error(err))
 }})
})


function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
}






client.on("message", async message => {
  if (message.author.bot) return;

  


  	var msgguild = message.guild
var antilienmode = db.fetch(`config_antilien_${msgguild.id}`)
	if(antilienmode === 'on') {
    if(is_url(message.content) === true) {

      let whitelist = db.fetch(`whitelist_${message.guild.id}_${message.author.id}`)
      let owner =  db.fetch(`owner_${message.author.id}`)


      if(whitelist == 1 || owner !== 0 || owner !== null || message.author.id !== config.OWNER_ID) {
        return
      } else {
      message.delete()
      return message.channel.send("**ANTI-PUB** **»** Les liens ne sont pas autorisés ici").then(m => m.delete({ timeout: 2000 }));
    }
    }
    }
    
    
    
    
    let confirm = false;
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
      
    }
    var antiinsultemode = db.fetch(`config_antiinsulte_${msgguild.id}`)
    if (antiinsultemode === 'on') {
    if(confirm) {

      let whitelist = db.fetch(`whitelist_${message.guild.id}_${message.author.id}`)
      let owner =  db.fetch(`owner_${message.author.id}`)


      if(whitelist == 1 || owner !== 0 || owner !== null || message.author.id !== config.OWNER_ID) {
        return
      } else {

      message.delete()
      return message.channel.send("**ANTI-INSULTE** **»** Se mot n'est pas autorisé").then(m => m.delete({ timeout: 2000 }));
    }   
    } 
    
    
  }
  
  
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = DEFAULT_PREFIX;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

let cmdx = db.get(`cmd_${message.guild.id}`)

if(cmdx) {
  let cmdy = cmdx.find(x => x.name === cmd)
  if(cmdy) message.channel.send(cmdy.responce)
}

  
  let command = client.commands.get(cmd);
  
  if (!command) command = client.commands.get(client.aliases.get(cmd));



  
  if (command) command.run(client, message, args);

  return addexp(message);
});

const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNzM0ODAyNDgyODY5MDQ2MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA5MjcyMzE2fQ.4T4j6C0hak7jmAD1psEZXkIGaHLoJgQ0y7fnYwJDEow', client);

dbl.on('posted', () => {
})

client.login(process.env.TOKEN);