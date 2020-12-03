
module.exports = {
  name: 'flip',
  aliases: ['coin'],
  catergory: 'fun',
  description: 'Flip a coin!',
  usage: 'flip',
  run: async (Discord, bot, msg, args) => {
    let replies = [
      "Heads",
      "Tails",
      "Heads",
      "Tails",
      "Heads",
      "Tails"
    ];
    let result = Math.floor(Math.random() * replies.length);

    let flipembed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag)
      .setTitle("Flip")
      .setColor("LIME")
      .addField("Result:", replies[result])
    msg.channel.startTyping().then(
    msg.channel.send(flipembed)
    )
    msg.channel.stopTyping();
    console.log("A coin was flipped and the result was:");
    console.log(replies[result]);
  }
}
