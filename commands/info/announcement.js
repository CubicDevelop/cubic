const { announcement } = require('../../config.json');

module.exports = {
  name: 'announcement',
  aliases: ['ann', 'anc', 'update', 'updates'],
  catergory: 'info',
  description: 'See the latest announcement from the developer!',
  usage: 'ping',
  run: async (Discord, bot, message, args) => {
      if(announcement) {
        const embed = new Discord.MessageEmbed()
        .setDescription(announcement)
        .setTitle('**ANNOUNCEMENT**')
        .setColor(0xFFFFFE)
        .setTimestamp();
        return message.channel.send(embed);
      } else {
        const na = await message.reply("There's no announcement here!");
        na.delete({
          timeout: 5000
        });
      }
  }
}
