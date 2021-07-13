
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setstarboard",
    description: "Permet de voir les ancien pseudo de la personne",
    category: "modération",
    run: (client, message, args) => {

 let channel = message.mentions.channels.first()
    
        if(!channel) {
            return message.channel.send("Merci de mentionner un salon")
        }
     
          
            db.set(`starboard_${message.guild.id}`, channel.id)
        
        message.channel.send("Vous avez défini avec succès le canal de **starboard** sur <#" + channel.id + ">")
    }
}