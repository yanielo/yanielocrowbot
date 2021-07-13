
const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "add",
  aliases: ["add"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES'))
    return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
msg.delete({ timeout: 30000 })
})
const member = message.mentions.members.first()
if (!member)
    return message.channel.send("Vous avez mentionner personne").then(msg => {
msg.delete({ timeout: 30000 })
})
const add = args.slice(1).join(" ")
if (!add)
    return message.channel.send("vous n'avez pas specifier de role").then(msg => {
msg.delete({ timeout: 30000 })
})
const roleAdd = message.guild.roles.cache.find(role => role.name === add)
if (!roleAdd)
    return message.channel.send("le role n'existe pas").then(msg => {
msg.delete({ timeout: 30000 })
})
if (member.roles.cache.get(roleAdd.id))
    return message.channel.send(`**cette personne a deja ${add} comme role**`).then(msg => {
msg.delete({ timeout: 30000 })
})
member.roles.add(roleAdd.id).then((member) => {
    message.channel.send(`✅ ${add} ajouté pour ${member.displayName}`)
    
})
  }




  }