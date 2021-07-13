const { MessageEmbed } = require('discord.js');
const db = require(`quick.db`)

module.exports = {
  name: "antiwebhook",
  category: "config",
  description: "Permet de configurer l'autogban",
  usage: "autogban on/off",
  run: async (client, message, args) => {
    let owner =  db.fetch(`owner_${message.author.id}`)

    if(owner === 0 || owner === null || message.author.id !== owner === 1) return  message.channel.send(" `ERREUR` tu n'est pas owner!!.")

  if(args[0] === "on") {
      message.channel.send("Anti webhook activé")
      db.set("antiwb_"+ message.guild.id , true)
  }
  if(args[0] === "off") {
    message.channel.send(" Anti webhook désactivé")
    db.set("antiwb_"+ message.guild.id , null)

}


    }
}
