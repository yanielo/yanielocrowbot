const discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
  name: "unban",
  category: "modération",
  description: "Unban l'utilisateur souhaiter",
  usage: "unban <@utilisateur> <raison>",
  run: async (client, message, args) => {

    
      let owner =  db.fetch(`owner_${message.author.id}`)
    
      if(owner === 0 || owner === null || message.author.id !== config.OWNER_ID) return
    const reason = args.slice(1).join(" ");
    const user = args[0];
    const embed1 = new discord.MessageEmbed()
        .setTitle("Error")
        .setDescription("**la personne n'est pas ban !!**")
        .setColor("BLACK");
    const embed2 = new discord.MessageEmbed()
        .setDescription("vous devez fournir un identifiant utilisateur résolvable, c’est-à-dire un identifiant d’utilisateur.")
        .setColor("BLACK");
    const userID = args[0];
    message.guild.fetchBans().then(bans => {
        if (bans.size == 0) {
            return message.channel
                .send(embed1)
                .then(m => m.delete({ timeout: 15000 }));
        }
        const bUser = bans.find(b => b.user.id == userID);
        if (!bUser) {
            return message.channel
                .send(embed2)
                .then(m => m.delete({ timeout: 15000 }));
        }
        var today = new Date();
        var dd = today.getDate();
    
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
    
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = mm+'/'+dd+'/'+yyyy;
        const EMDDD = new discord.MessageEmbed()
        .setTitle("Nouveau membre unban")
        .setDescription(`
            Membre unban : ${args[0]}
            unban le : ${today}
            Reason : ${reason}
        `)
        .setFooter(`${client.user.username}`)
        .setColor("BLACK")
        .setTimestamp();
        message.channel.send(EMDDD);
        message.guild.members.unban(bUser.user);
      
    })
    
  }
}
