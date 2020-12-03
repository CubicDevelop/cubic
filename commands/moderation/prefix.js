const mongoose = require('mongoose');
const Prefix = require('../../models/prf.js');



module.exports = {
  name: "settings",
  catergory: "moderation",
  description: "Change the server's bot settings such as prefix and swear filters.",
  run: async (Discord, bot, message, args) => {
    if(message.member.hasPermission('MANAGE_GUILD')){
      const cmd = args.shift();
    if(!args[0]) {
      let botinfo = bot.prefixes.get(message.guild.id);
      if(!botinfo) botinfo = await Prefix.findGuild(message.guild.id);
      const embed = new Discord.MessageEmbed()
      .setColor(0xFFFFFE)
      .setTimestamp()
      .setFooter(message.guild.id, message.guild.iconURL())
      .setDescription(`**Prefix:** \`${botinfo[0].prefix}\`\n**Slur filter:** \`${botinfo[0].slurs}\`\n**Swear filter:** \`${botinfo[0].swears}\``);
      message.channel.send(embed);
    }
    switch (args[0]) {
    case "prefix":
    if (args[1]) {
      let updating = bot.prefixes.get(message.guild.id);
if(!updating) updating = await Prefix.findGuild(message.guild.id);
      if(!updating[0]) {
        return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`There was an error while finding the prefix for ${message.guild.name}. Please try again soon.`).setFooter(message.guild.id).setTimestamp());
      }
      updating[0].prefix = args[1];
      updating[0].save().catch(err => console.log(err));
      const deleted = bot.prefixes.delete(message.guild.id);
      if(!deleted) {
        return message.channel.send('There was an error while updating the bot\'s cache, and you may have to wait until the bot restarts for your changes to be put in place.');
      }
      let embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTimestamp()
      .setFooter(message.guild.id)
      .setDescription(`The prefix for ${message.guild.name} has been changed to \`${updating[0].prefix}\`.`);
      return message.channel.send(embed);
    } else {
      let guildPrefix = bot.prefixes.get(message.guild.id);
      if(!guildPrefix) guildPrefix = await Prefix.findGuild(message.guild.id);
      let embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTimestamp()
      .setFooter(message.guild.id)
      .setThumbnail(message.author.displayAvatarURL)
      .setDescription(`The prefix for ${message.guild.name} is \`${guildPrefix[0].prefix}\`.`);
      message.channel.send(embed);
    }

    break;
    case "slurs":
    if(!args[1]) {
      guildSlurs = bot.prefixes.get(message.guild.id);
      if(!guildSlurs) guildSlurs = await Prefix.findGuild(message.guild.id);
      const embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setFooter(message.guild.id, message.guild.iconURL())
      .setDescription('Filter racial slurs: ' + guildSlurs[0].slurs);
if(guildSlurs[0].slurs) {
  embed.setColor('GREEN');
} else {
  embed.setColor('RED');
}
message.channel.send(embed);

}
    else {
    let updating = bot.prefixes.get(message.guild.id);
    if(!updating) updating = await Prefix.findGuild(message.guild.id);
            if(!updating[0]) {
              return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`There was an error while finding this setting for ${message.guild.name}. Please try again soon.`).setFooter(message.guild.id).setTimestamp());
            }
            const value = (args[1] === 'true');
            updating[0].slurs = value;
            updating[0].save().catch(err => console.log(err));
            const deleted = bot.prefixes.delete(message.guild.id);
            if(!deleted) {
              return message.channel.send('There was an error while updating the bot\'s cache, and you may have to wait until the bot restarts for your changes to be put in place.');
            }
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setFooter(message.guild.id)
            .setDescription(`The racial slur filter value for ${message.guild.name} has been changed to \`${updating[0].slurs}\`.`);
            return message.channel.send(embed);
}
    break;
    case "swear":
    if(!args[1]) {
      let guildSwears = bot.prefixes.get(message.guild.id);
      if(!guildSwears) guildSwears = await Prefix.findGuild(message.guild.id);
      const embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setFooter(message.guild.id, message.guild.iconURL())
      .setDescription('Filter swear words: `' + guildSwears[0].swears + '`');
if(guildSlurs[0].swears) {
  embed.setColor('GREEN');
} else {
  embed.setColor('RED');
}
message.channel.send(embed);

}
    else {
      let updating = bot.prefixes.get(message.guild.id);
      if(!updating) updating = await Prefix.findGuild(message.guild.id);
            if(!updating[0]) {
              return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`There was an error while finding this setting for ${message.guild.name}. Please try again soon.`).setFooter(message.guild.id).setTimestamp());
            }
            const value = (args[1] === 'true');
            updating[0].swears = value;
            updating[0].save().catch(err => console.log(err));
            const deleted = bot.prefixes.delete(message.guild.id);
            if(!deleted) {
              return message.channel.send('There was an error while updating the bot\'s cache, and you may have to wait until the bot restarts for your changes to be put in place.');
            }
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setFooter(message.guild.id)
            .setDescription(`The swear filter value for ${message.guild.name} has been changed to \`${updating[0].swears}\`.`);
            return message.channel.send(embed);
}
    break;
    case "help":
    const embed = new Discord.MessageEmbed()
    .setTitle(`Bot Settings for ${message.guild.name}`)
    .setTimestamp()
    .setColor(0xFF99FF)
    .setFooter(message.guild.id)
    .setDescription(`\`prefix\` -> change the bot's prefix for the server. Can be almost anything.\n\`slurs\` -> toggle the slur filter for this server. Either \`true\` or \`false\`.\n\`swear\` -> toggle the swear filter for this server (if enabled, automatically toggles slur filter as well). Either \`true\` or \`false\`.`);
    return message.channel.send(embed);

    break;
  }
} else {
  message.reply('You must have the `MANAGE SERVER` permission to change bot settings.');
}
    }
}
