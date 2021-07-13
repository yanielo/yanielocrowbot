const { MessageEmbed } = require('discord.js');
const db = require(`quick.db`)
const config = require("../../config.json")

module.exports = {
  name: "antibot",
  category: "config",
  description: "Permet de configurer l'autogban",
  usage: "autogban on/off",

 
  
  run: async (client, message, args) => {

    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
     prefix =  config.DEFAULT_PREFIX
   }
      
      
    let owner =  db.fetch(`owner_${message.author.id}`)

    if(owner === 0 || owner === null || message.author.id !== owner === 1) return  message.channel.send(" `ERREUR` tu n'est pas owner!!.")

    if(args[0] === "gestion") {
      let color =  db.fetch(`config_couleur_${message.guild.id}`)
      const Embed = new MessageEmbed()
      .setTitle("**Mode Antibot activé 🤖**")
      .addField(`**Pour acitver le mode Antibot quand le mode antibot seras acitvé chaque bot ajouter seras auto ban de (${message.guild.name}) 📑**`, `\`${prefix}Antibot on\``)
      .addField(`**Pour désactiver le mode antibot quand le mode antibot seras desactivé chaque bot seras ajouter au serveur (${message.guild.name}) 📑**` , `\`${prefix}Antibot off\``)
      .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
      .setTimestamp()  
      .setColor(color)
      message.channel.send(Embed).then(mes => {
        mes.react("🤖");
    });
   

      
    }
    if(args[0] === "on") {
      message.channel.send("antibot acitvé")
    

  
    db.set("antibot_"+ message.guild.id , true)
  }
  if(args[0] === "off") {
    message.channel.send("antibot désactivé")
    db.set("antibot_"+ message.guild.id , null)

}


    }
}
