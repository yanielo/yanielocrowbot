const discord = require("discord.js");
const db = require(`quick.db`)
const config = require("../../config.json")

module.exports = {
  name: "bl",
  category: "modération",
  description: "Banni l'utilisateur souhaiter",
  usage: "ban <@utilisateur> <raison>",
  run: async (client, message, args, Discord) => {
    let owner =  db.fetch(`owner_${message.author.id}`)

    if(owner === 0 || owner === null || message.author.id !== owner === 1) return  message.channel.send(" `ERREUR` tu n'est pas owner!!.")
    if(args[0] == "add") {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send('Veuillez mentionner le membre en question.')
    const bl = db.fetch(`bl_${user.id}`)
    if(bl == true) return message.channel.send(`<@${user.id}> est déjà Blacklist !`)
    message.channel.send(`<@${user.id}>, est maintenant blacklist !`)
    db.set(`bl_${user.id}`, true)
    }
    if(args[0] == "remove") {
        if(!user) return message.channel.send('Veuillez mentionner le membre en question.')
    const bl = db.fetch(`bl_${user.id}`)
    if(bl == false) return message.reply(`<@${user.id}> n'était pas Blacklist !`)
    message.channel.send(`${user.username} est maintenant unblacklist !`)
    db.set(`bl_${user.id}`, false)
    }
    
    
}
}


    
    
  

