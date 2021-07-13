const Discord = require('discord.js');
module.exports = {
    name: 'vc',
    run: async (client, message, data,args) => {
            var connectedCount = 0;
            var streamingCount = 0;
            var mutedMic = 0;

            const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
            channels.forEach(c => {
                connectedCount += c.members.size;
                    c.members.forEach(m => {
                        if(m.voice.streaming) streamingCount++;
                        if(m.voice.selfMute || m.voice.serverMute) mutedMic++;
                    })
            })
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Vous devez avoir la permission `ADMINISTRATOR` pour utiliser cette commande.");
        let embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(`🎤   Salons vocaux`)
        .setDescription(`\`Il y a actuellement ${message.guild.members.cache.filter(m => m.voice.channel).size} ${message.guild.members.cache.filter(m => m.voice.channel).size  > 1 ? 'personnes' : 'personne'} en vocal sur le serveur.\``)
        .setColor(data.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic : true }))


        
      
        return  message.channel.send(embed)
    }
}