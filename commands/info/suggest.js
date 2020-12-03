module.exports = {
  name: 'suggest',
  aliases: ['sg', 'suggestion'],
  catergory: 'info',
  description: 'Suggest a feature for the bot!',
  usage: 'suggest [suggestion]',
  run: async (Discord, bot, message, args) => {
    args.shift()
    let suggestion = args.join(" ");
    bot.guilds.cache.get('728493944182145035').channels.cache.get('728731145944039546').send(`${suggestion} : ${message.author.id}`);
    const embed = new Discord.MessageEmbed()
    .setTitle('Your suggestion has been passed on successfully!')
    .setColor('GREEN')
    .setDescription(suggestion)
    .setTimestamp()
    .setFooter('Your suggestion will be reviewed as soon as possible. Please do not expect a response.', message.author.displayAvatarURL());
    message.channel.send(embed);
  }
}
