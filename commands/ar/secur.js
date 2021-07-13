const discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "config",
  category: "info",
  usage: "config",
  description: "Permet de voir la configuration du bot sur le serveur",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix =  config.DEFAULT_PREFIX
  }
  let serveurid = message.guild.id;
var config_blacklist = db.get(`config_blacklist_${serveurid}`)
var config_webhook = db.get(`antiwb_${serveurid}`)
var config_pub = db.get(`al_${serveurid}`)
var config_antibot = db.get(`antibot_${serveurid}`)
var config_antijoin = db.get(`antiraid_${serveurid}`)
var config_antichannel = db.get(`antich_${serveurid}`)
let blackembed = new discord.MessageEmbed()
.setTitle("Configuration du Serveur")
.setDescription(`**Fonction __BlackList__**: \`${config_blacklist}\`\n**Fonction __AntiWebhook__**: \`${config_webhook}\`\n**Fonction __Antipub__**: \`${config_pub}\`\n**Fonction __Antijoin__**: \`${config_antijoin}\`\n**Fonction __Antibot__**: \`${config_antibot}\`\n**Fonction __Antichannel__**: \`${config_antichannel}\``)
.setColor("#BLACK")
message.channel.send(blackembed)
  }}