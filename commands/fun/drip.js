module.exports = {
    name: "drip",
    aliases: ['gokudrip'],
    catergory: "fun",
    description: "gives you yourself but with ***drip***",
    usage: "drip [user]",
    run: async (Discord, bot, message, args) => {
        const user = message.mentions.users.first();
        const embed = new Discord.MessageEmbed()
                    .setTitle("D R I P")
                    .setImage(`https://vacefron.nl/api/drip?avatar=${user.displayAvatarUrl() ?? message.author.displayAvatarUrl()}`)
                    .setColor('RANDOM')
                    .setTimestamp();
                    message.channel.send(embed);
  }
  }
  
  
