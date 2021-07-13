const db = require("quick.db")
module.exports = {
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        let owner =  db.fetch(`owner_${message.author.id}`)

        if(owner === 0 || owner === null || message.author.id !== owner === 1) return  message.channel.send(" `ERREUR` tu n'est pas owner!!.")
    
        if (!member) return message.channel.send("Invalid member");
        member.voice ? member.voice.setChannel(null) : "";
    
     message.channel.send(`${member} a était kick du channel par ${message.author}`)
     
      client.channels.cache.get('835274113957232642');
        
    },
    name: 'kickvoice',
    guildOnly: true
}