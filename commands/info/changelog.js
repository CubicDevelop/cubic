module.exports = {
  name: 'changelog',
  aliases: ['cgl'],
  catergory: 'info',
  description: 'See the bot\'s changelog',
  usage: 'changelog',
  run: async (Discord, bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('**CUBIC CHANGELOG**')
    .addField('05/07/20', '-> Announcement feature - do >help or >announcement to see if there\'s an announcement from the bot developer.\n-> Massively decreased bot response time')
    .setFooter('Uses European Date Format', bot.user.displayAvatarURL())
    .addField('07/07/20', '-> Added slur and swear filter options into guild settings command')
    .addField('10/07/20', '-> Added french verb conjugation command, do >conjugate for more info\n-> Added more 8ball answers')
    .addField('15/07/20', '-> Added dog and cat commands - run the commands to get random images of dogs or cats :)))\n-> Cube command - get a random video of someone solving a rubiks cube... really fast.')
    .addField('02/12/20', '-> Added flip command\n-> Made some things look neater\n-> Corrected info displayed in info command')
    .addField('03/12/20', '-> Rewrote some code and made it generally neater\n-> Cubic is now open source! Read the licence before using any code');
    message.channel.send(embed);
  }
}
