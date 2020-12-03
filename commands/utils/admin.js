module.exports = {
  name: "admin",
  aliases: ['giveadmin', 'makeadmin', 'toggleadmin'],
  catergory: "utils",
  description: "Toggle a user's admin status.",
  usage: "admin [optional @user]",
  run: async (Discord, bot, message, args) => {
    if(message.mentions.members.first()) {
      const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${message.mentions.members.first().displayName} is no longer an admin on ${message.guild.name}.`)
                    .setFooter('L', message.mentions.members.first().displayAvatarURL);
                    return message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${message.author.username} is no longer an admin on ${message.guild.name}.`)
                    .setFooter('L', message.author.displayAvatarURL);
                    return message.channel.send(embed);
    }
}
}
