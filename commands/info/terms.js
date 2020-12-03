module.exports = {
  name: 'terms',
  aliases: ['tac', 'tacs', 't&c', 't&cs', 'conditions', 'term', 'tos'],
  catergory: 'info',
  description: 'See the bot\'s terms and conditions of use',
  usage: 'terms',
  run: async (Discord, bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('**CUBIC TERMS**')
    .setDescription('**[1]**: Bot developers and moderators have the ability and right to blacklist (disable your access) you from any or all parts of the bot, for any reason.\n**[2]**: The developers of this bot do not store, but may have access to any information that the bot can view. We (the developers) will not use this information, nor shall we give/sell it to anyone else, except under circumstances where it is required to do so legally or morally.')
    .setColor(0xFFFFFE)
    .setTimestamp()
    .setFooter('We (the developers) have the right and ability to amend these terms at any time, with or without notice.', bot.user.displayAvatarURL());
    message.channel.send(embed);
  }
}
