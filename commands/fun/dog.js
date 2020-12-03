const request = require('request');
const cheerio = require('cheerio');


module.exports = {
  name: "dog",
  aliases: ['doggo', 'puppy'],
  catergory: "fun",
  description: "omg such a cute lil' doggo",
  usage: "dog [info (optional)]",
  run: async (Discord, bot, message, args) => {
    if(args[1] === 'info') {
      message.channel.send(`Images from https://pixabay.com`);
    } else {
      doggo(message, Discord.MessageEmbed, bot);
    }
  }
}
function doggo(message, MessageEmbed, bot){
      var options = {
          url: `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=dog&image_type=photo&safesearch=true&per_page=50`,
          method: "GET",
          headers: {
              "Accept": "text/html",
              "User-Agent": "Chrome"
          }
      };

      //---------- request data






              const number = Math.floor(Math.random() * 10);
              if(number % 3 === 0 && bot.dogs.array().length >= 10) {
                const pickone = bot.dogs.get(Math.floor(Math.random() * bot.dogs.array().length));
                let icon = null;
                if(message.author.id) {
                  icon = message.author.displayAvatarURL();
                } else {
                  icon = bot.user.displayAvatarURL();
                }
                const embed = new MessageEmbed()
                .setImage(pickone.largeImageURL)
                .setURL(pickone.pageURL)
                .setTitle('eee so cuuttee')
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
                    bot.dogs.set(bot.dogs.array().length, pickone);
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
                    .setTitle('eee so cuuttee')
                    .setFooter(`Requested by ${message.author.tag} ‧ Images from https://pixabay.com`, icon)
                    .setColor(0xEE0069);
                    message.channel.send(embed);

            });
          }



      //------- end request

    }
