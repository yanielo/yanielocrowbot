const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
  name: "derank",
  category: "modération",
  usage: "clear <nombre de messages>",
  description: "Supprime le nombre de messages voulu",
  run: async (client, message,args) => {
    let user = await client.users.cache.get(args[0]) || message.mentions.members.first()  
    if(!user) return message.channel.send(` ${message.author}, utilisateur introuvable.`)
if(user) {
if (user.id === message.author.id) {
  return message.channel.send(` Je ne peux pas vous derank parce que vous êtes l'auteur du message.`);
}
if (user.id ===client.user.id) {
  return message.channel.send(` Je ne peux pas me derank.`);
}
if(user.roles.highest.position > message.member.roles.highest.position) return message.channel.send(` ${message.author}, Vous ne pouvez pas derank quelqu'un au dessus de vous.`)
if ( user.roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send(' Les roles de l\'utilisateur sont plus haut que moi!')

}
if(args[0]) {


 message.channel.send(` ${message.author}, vous avez derank **${user.user.username}**`)
    user.roles.set([])
    
}
    
}
}