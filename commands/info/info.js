module.exports = {
  name: 'info',
  aliases: ['botinfo'],
  catergory: 'info',
  description: 'See info about the bot.',
  usage: 'info',
  run: async (Discord, bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('ORANGE')
    .setDescription('Cubic information')
    .addField('Server count:', bot.guilds.cache.size, true)
    .addField('Bot owner:', 'LordOfTheCube#0419 (owner + developer)\nRxptor#6995 (co-owner)', true)
    .addField('Links:', '[top.gg](https://top.gg/bot/728389297341726840)\n[Discord Bot List](https://discord.ly/cubebot-0406)\n[Glenn Bot List](https://bit.ly/cubebot1)\n[Support server](https://discord.gg/qMsmYKj)', true)
    .addField('Ping:', bot.ws.ping + 'ms', true)
    .setTimestamp()
    .setThumbnail(bot.user.displayAvatarURL());
    message.channel.send(embed);

  }
}
