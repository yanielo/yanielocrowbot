const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
  name: "moovall",
  category: "modération",
  usage: "clear <nombre de messages>",
  description: "Supprime le nombre de messages voulu",
  run: async (client, message,args) => {

    let owner =  db.fetch(`owner_${message.author.id}`)

    if(owner === 0 || owner === null || message.author.id !== owner === 1) return  message.channel.send(" `ERREUR` tu n'est pas owner!!.")
    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send("Tu n'es pas dans un salon vocal !");
    if (!message.guild.me.voice.connection) {
        channel.join().then((connection) => {
            message.guild.me.voice.setSelfDeaf(true);
            message.channel.send(`${message.author}, déplace moi dans le salon ou tu souhaite que je déplace toutes les personnes du salon!`)


            client.on("voiceStateUpdate", async (oldmem, newmem) => {
                if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {
                    let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);
                    if (client.user.id === newmem.member.user.id) {
                        channel.members.forEach(e => {
                            e.voice.setChannel(newchannel);
                            newchannel.leave();
                        })
                    }
                }
            })
        })
    }
    else {
        message.channel.send(" Tu n'es pas dans un salon vocal !");
    }
  



    
}
}