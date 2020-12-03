const request = require('request');
const cheerio = require('cheerio');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "fact",
  aliases: ['facts'],
  catergory: "fun",
  description: "Get a random fact...",
  usage: "fact",
  run: async (Discord, bot, message, args) => {
    fact(message, bot.user.displayAvatarURL());
  }
}
function fact(message, botIcon){

      var options = {
          url: `https://uselessfacts.jsph.pl/random.json?language=en`,
          method: "GET",
          headers: {
              "Accept": "text/html",
              "User-Agent": "Chrome"
          }
      };

  //---------- request data
      request(options, function(error, response, responseBody) {
          if (error) {
            console.log("error");
              return;
          }
          let icon = null;
          if(message.author.id) {
            icon = message.author.displayAvatarURL();
          } else {
            icon = botIcon;
          }
          $ = cheerio.load(responseBody);
          const fact = JSON.parse(response.body);
          const embed = new MessageEmbed()
          .setColor(0xFFFFFE)
          .setDescription(fact.text)
          .setTitle('Here is your fact', icon);
          message.channel.send(embed);

      });

  //------- end request

}
