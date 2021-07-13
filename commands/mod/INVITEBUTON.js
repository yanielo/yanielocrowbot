const { MessageEmbed } = require('discord.js');
const db = require(`quick.db`)
const config = require("../../config.json")

module.exports = { 
    name : "invite",
    aliase : ["invitation","invites"],

    run: async(client,message,args) => {
        let color =  db.fetch(`config_couleur_${message.guild.id}`)
        const Embed = new MessageEmbed()
        .setTitle("**INVITATION BOT**")
        .addField(`**Pour inviter le bot sur ton serveur avec permission 📑**`, `\`https://discord.com/api/oauth2/authorize?client_id=831178533593415691&permissions=8&scope=bot\``)
        .addField(`**Pour inviter le bot sur ton serveur sans permission 📑**` , `\`https://discord.com/api/oauth2/authorize?client_id=831178533593415691&permissions=0&scope=bot\``)
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        .setTimestamp()  
        .setColor(color)
        message.channel.send(Embed).then(mes => {
          mes.react("🤖");
      });
    }


   
}