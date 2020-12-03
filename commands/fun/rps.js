// By TheSourceCode in their Youtube tutorial

const { promptMessage } = require('../../functions.js');

const chooseArr = ['⛰️', '📰', '✂️'];

module.exports = {
  name: "rps",
  catergory: "fun",
  description: "Rock Paper Scissors - react to play the game",
  usage: "rps",
  run: async (Discord, bot, message, args) => {
    const embed = new Discord.MessageEmbed()
                  .setTimestamp()
                  .setColor('#ffffff')
                  .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL())
                  .setDescription("Add a reaction to one of these emojis to play the game.")
    const m = await message.channel.send(embed);
    const reacted = await promptMessage(m , message.author, 30, chooseArr);
    const botChoice = chooseArr[Math.floor(Math.random() *  chooseArr.length)];

    const result = await getResult(reacted, botChoice);
    await m.reactions.removeAll();
embed
.setDescription('')
.addField(result, `${reacted} vs. ${botChoice}`);
m.edit(embed);
    function getResult(me, clientChosen) {
      if (me === '⛰️') {
        switch(clientChosen) {
          case '⛰️':
          return 'It was a tie!';
          break;
          case '📰':
          return 'You lost :(';
          break;
          case '✂️':
          return 'You won!';
          break;
        }
      } else if (me === '📰') {
        switch(clientChosen) {
          case '⛰️':
          return 'You won!';
          break;
          case '📰':
          return 'It was a tie!';
          break;
          case '✂️':
          return 'You lost :(';
          break;
        }
      } else if (me === '✂️') {
        switch(clientChosen) {
          case '⛰️':
          return 'You lost :(';
          break;
          case '📰':
          return 'You won!';
          break;
          case '✂️':
          return 'It was a tie!';
          break;
        }
      }
    }
}
}
