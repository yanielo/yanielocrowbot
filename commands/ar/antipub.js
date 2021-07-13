const { MessageEmbed } = require('discord.js');
const db = require(`quick.db`)

module.exports = {
  name: "antipub",
  category: "config",
  description: "Permet de configurer l'autogban",
  usage: "autogban on/off",
  run: async (client, message, args) => {
    let authorized = [`owners id` , `${message.guild.ownerID}`]
    if(!authorized.includes(message.author.id)) return message.channel.send("<a:emoji4:806652395852791858> `ERREUR` Vous n'avez pas la couronne du serveur.")

  if(args[0] === "on") {
      message.channel.send("Anti pub activé")
      db.set("al_"+ message.guild.id , true)
  }
  if(args[0] === "off") {
    message.channel.send(" Anti pub désactivé")
    db.set("al_"+ message.guild.id , null)

}


    }
}
