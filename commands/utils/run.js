const isOwner = require('../../ownerCheck.js');
const beautify = require('beautify');
const { readFileSync, readFile } = require('fs');

module.exports = {
  name: "run",
  aliases: ['eval', 'e'],
  catergory: "utils",
  ignored: true,
  description: "Evaluate any bit of JS",
  usage: "run [code]",
  run: async (Discord, bot, message, args) => {
    if(!isOwner(message)) {
      const notOwner = await message.channel.send('e')
          return notOwner.delete({
            timeout: 15000,
            reason: 'User of evaluation command not owner'
          });
    }
    if (!args[1]) {
      const runNothing = await message.channel.send('<:bruh:730688438138830858> yes because running nothing is possible');
            return runNothing.delete({
              timeout: 20000,
              reason: 'No code provided in evaluation command'
            });
    }
    args.shift();
    let toEval = args.join(" ");
    try {
        if(toEval.toLowerCase().includes('token')) {
          return message.channel.send(new Discord.MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                                                                .setFooter("Contains keyword 'token'.")
                                                                .setColor(0xFF0000));
        }
        if(toEval.toLowerCase().includes('waifdjid')) {
          return message.channel.send(new Discord.MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                                                                .setFooter("Reason hidden by developer")
                                                                .setColor(0xFF0000));
        }
        if(toEval.toLowerCase().includes('config')) {
          return message.channel.send(new Discord.MessageEmbed().setDescription('I couldn\'t perform this command as it looks suspicious.')
                                                                .setFooter("Contains keyword 'config'")
                                                                .setColor(0xFF0000));
        }
        const evaluated = eval(toEval);
        try {
        let embed = new Discord.MessageEmbed()
                    .setColor(0x00FF00)
                    .setTimestamp()
                    .setFooter(bot.user.username, bot.user.displayAvatarURL)
                    .setTitle('Eval')
                    .addField('Ran:', `\`\`\`js\n${beautify(args.join(" "), {format: 'js'})}\n\`\`\``)
                    .addField('Returned:', evaluated)
                    .addField("Type of:", typeof(evaluated));
        message.channel.send(embed);
      } catch {
        message.channel.send('The request was sucessful, however there was an error while generating the result.');
      }
    } catch (e) {
      try {
        let embed = new Discord.MessageEmbed()
                    .setColor(0xFF0000)
                    .setTitle('\:x: Error!')
                    .setTimestamp()
                    .setDescription(e)
                    .setFooter(bot.user.username, bot.user.displayAvatarURL);
                    message.channel.send(embed);
                  } catch {
                    message.channel.send('There was an error!');
                  }

    }
}
}
