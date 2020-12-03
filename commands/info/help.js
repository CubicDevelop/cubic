const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const { announcement } = require('../../config.json');
module.exports = {
  name: "help",
  catergory: "info",
  description: "Print this help message",
  run: async (Discord, bot, message, args) => {
    if(args[1]) {
      return getCMD(bot, message, args[1]);
    } else {
      return getAll(bot,message);
    }
}
}

function getAll(bot, message) {
  let embed = new MessageEmbed()
              .setColor(0xFF99FF)
              .setFooter(`Do \`help [command]\` to see more info about a specific command.`, message.author.displayAvatarURL());

  const commands = (catergory) => {
    return bot.commands
          .filter(cmd => cmd.catergory === catergory)
          .filter(cmd => !cmd.ignored)
          .map(cmd => `\`${cmd.name}\``)
          .join(", ");
  }
  let info = "";
  if(announcement) {
    info += '**ANNOUNCEMENT:**\n' + announcement + '\n\n';
  }
  info += bot.catergories
              .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
              .reduce((string, catergory) => string + "\n" + catergory);

  return message.channel.send(embed.setDescription(info).setTimestamp());
}

function getCMD(bot, message, input) {
  let embed = new MessageEmbed();
  const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

  let info = `No information found for the command *${input.toLowerCase()}*`;
  if(!cmd || cmd.ignored) {
    return message.channel.send(embed.setColor(0xFF0000).setDescription(info));
  }
  if(cmd.name) info = `**Command name**: ${cmd.name}`;
  if(cmd.description) info += `\n**Description**: ${cmd.description}`;
  if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
  if(cmd.usage) info += `\n **Usage**: ${cmd.usage}`;

  return message.channel.send(embed.setColor('GREEN').setDescription(info).setTimestamp().setFooter( message.author.username, message.author.displayAvatarURL()));
}
