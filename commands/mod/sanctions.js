const db = require("quick.db")

module.exports = {
  name: "sanctions",
  description: "Permet de voir les avertissements de la personne voulu",
  category: "modération",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.channel.send(`${user} posséde **${warnings}** avertissement(s)`)

  }
}