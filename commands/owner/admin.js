
const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "admin",
  aliases: ["admin"],
  run: async (client, message, args) => {
    var mdrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlol = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
    var lolllllllllllllllllllllllllllllll = mdrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlol.map(m => `${m.user.id}: ${m.user.username},`).join("\n")
    message.channel.send(`Liste des membres ayant les permissions \`ADMINISTRATOR\` (**${mdrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlol.size}**)`)
    for (let i = 0; i < lolllllllllllllllllllllllllllllll.length; i += 1995) {
        const vocalcountmdrrrrrrrrrrrrrrrrr = lolllllllllllllllllllllllllllllll.substring(i, Math.min(lolllllllllllllllllllllllllllllll.length, i + 1995));
        message.channel.send(`\`\`\`html\n${vocalcountmdrrrrrrrrrrrrrrrrr}\`\`\``);
  }

}


  }