module.exports = {
  name: "8ball",
  aliases: ['8b', 'yesorno'],
  catergory: "fun",
  description: "The bot will answer your yes/no question..",
  usage: "8ball [optional question (doesn't affect the answer)]",
  run: async (Discord, bot, message, args) => {
    const answers = ['yes', 'no', 'of course not', 'maybe', 'idk', 'depends', 'you will never know', 'of course', 'it seems so'];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    const embed = new Discord.MessageEmbed()
                  .setDescription('The answer is... \n' + answer)
                  .setColor('RANDOM')
                  .setFooter(message.author.username, message.author.displayAvatarURL())
                  .setTimestamp();
                  message.channel.send(embed);
}
}
