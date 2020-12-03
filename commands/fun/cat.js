const request = require('request');
const cheerio = require('cheerio');


module.exports = {
  name: "cat",
  aliases: ['kitty'],
  catergory: "fun",
  description: "omg is that a cat",
  usage: "cat [info (optional)]",
  run: async (Discord, bot, message, args) => {
    if(args[1] === 'info') {
      message.channel.send(`Images from https://pixabay.com`);
    } else {
      cat(message, Discord.MessageEmbed, bot);
    }
  }
}
function cat(message, MessageEmbed, bot){
      var options = {
          url: `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=cat&image_type=photo&safesearch=true&per_page=50`,
          method: "GET",
          headers: {
              "Accept": "text/html",
              "User-Agent": "Chrome"
          }
      };

      //---------- request data






              const number = Math.floor(Math.random() * 10);
              if(number % 3 === 0 && bot.cats.array().length >= 10) {
                const pickone = bot.cats.get(Math.floor(Math.random() * bot.cats.array().length));
                let icon = null;
                if(message.author.id) {
                  icon = message.author.displayAvatarURL();
                } else {
                  icon = bot.user.displayAvatarURL();
                }
                const embed = new MessageEmbed()
                .setImage(pickone.largeImageURL)
                .setURL(pickone.pageURL)
                .setTitle('omg so cutee')
                .setFooter(`Requested by ${message.author.tag} ‧ Images from https://pixabay.com`, icon)
                .setColor(0xEE0069);
                message.channel.send(embed);

              } else {
                request(options, function(error, response, responseBody) {
                  // if error
                    if (error) {
                      console.log(error);
                      message.channel.send("I couldn't do that. This may be because the command has been requested too much recently.")
                        return;
                    }
                    //--------------------------------> Get result
                    $ = cheerio.load(responseBody);
                    let value = JSON.parse(response.body);
                    const results = value.hits.length;
                    const pickone = value.hits[Math.floor(Math.random() * results)];
                    bot.cats.set(bot.cats.array().length, pickone);
                    let icon = null;
                    if(message.author.id) {
                      icon = message.author.displayAvatarURL();
                    } else {
                      icon = bot.user.displayAvatarURL();
                    }
                    //------------------------------> Send Embed
                    const embed = new MessageEmbed()
                    .setImage(pickone.largeImageURL)
                    .setURL(pickone.pageURL)
                    .setTitle('omg so cutee')
                    .setFooter(`Requested by ${message.author.tag} ‧ Images from https://pixabay.com`, icon)
                    .setColor(0xEE0069);
                    message.channel.send(embed);

            });
          }



      //------- end request

    }
