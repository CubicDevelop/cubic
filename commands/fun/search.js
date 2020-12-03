const request = require('request');
const cheerio = require('cheerio');


module.exports = {
  name: "search",
  aliases: ['image'],
  catergory: "fun",
  description: "Search for any image, by default SafeSearch is enabled in non-NSFW channels",
  usage: "search [query]",
  run: async (Discord, bot, message, args) => {
    if(args[1] === 'info') {
      message.channel.send(`Images from https://pixabay.com`);
    } else if(args[1] === 'help') {

    } else {
      args.shift();
      let query = args.join("+");
      query = encodeURI(query);
      query = encodeURIComponent(query);
      console.log(query);
      search(message, Discord.MessageEmbed, query);
    }
  }
}
function search(message, MessageEmbed, q){
      var options = {
          url: `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${q}&image_type=photo&safesearch=${!(message.channel.nsfw)}&per_page=50`,
          method: "GET",
          headers: {
              "Accept": "text/html",
              "User-Agent": "Chrome"
          }
      };

      //---------- request data







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
                    const results = Math.floor(value.hits.length / 4);
                    const pickone = value.hits[Math.floor(Math.random() * results)];
                    if(!pickone) {
                      return message.channel.send("I couldn't find anything :(\nIf you want to add your own pictures, I get these from https://pixabay.com , so if you upload pictures there they might be able to show up on the bot!");
                    }
                    //------------------------------> Send Embed
                    const embed = new MessageEmbed()
                    .setImage(pickone.largeImageURL)
                    .setDescription(`SafeSearch: ${!(message.channel.nsfw)}`)
                    .setURL(pickone.pageURL)
                    .setTitle(decodeURIComponent(q).split('+').join(" "))
                    .setFooter(`Requested by ${message.author.tag} ‧ Images from https://pixabay.com`, message.author.displayAvatarURL())
                    .setColor(0xEE0069);
                    message.channel.send(embed);

            });




      //------- end request

    }
