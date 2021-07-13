
const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "whitelist",
  aliases: ["wl"],
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix =  config.DEFAULT_PREFIX
  }

  let owner =  db.fetch(`owner_${message.author.id}`)

  if(owner === 0 || owner === null || message.author.id !== owner === 1) return

  let user = message.mentions.members.first()
  if(!user) return
  let whitelist = db.fetch(`whitelist_${user.id}`)
  if(whitelist === 1) return message.channel.send(`${user} est déjà whitelist`)
  message.channel.send(`${user} est maintenant whitelist`)
  db.add(`whitelist_${user.id}`, 1)
}


  }