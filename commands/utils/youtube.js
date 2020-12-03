const request = require('request');
const cheerio = require('cheerio');
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "youtube",
  aliases: ['yt'],
  catergory: "utils",
  description: "Get a youtube video's stats",
  usage: "youtube [video link] | [help]",
  run: async (Discord, bot, message, args) => {
    return message.channel.send("This command is currently not available. Join the support server to get notified when it becomes available again.");
    if(!args[1]) {
      message.reply("You must provide a link to a video!")
      return;
    }
    if (args[1] === 'help') {
      let embed = new Discord.MessageEmbed()
                  .setTitle(`Youtube command help`)
                  .addField(`youtube`, `
                    Syntax: youtube [video link]\n Provides stats (views, likes, dislikes, comment, id) about a given youtube video.`)
                  .setColor(0xFF99FF);
                  message.channel.send(embed);
    } else {

    let ytid = args[1].split("=")[1];
    let key = '';
    youtubestats(message, ytid, key);
  }
}
}
function youtubestats(message, ytid, ytkey){

      var options = {
          url: `https://www.googleapis.com/youtube/v3/videos?id=${ytid}&key=${ytkey}&part=snippet,statistics`,
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


          $ = cheerio.load(responseBody);
          let ytvidname = response.body.split(",")[7].split('"title": "')[1].substring(0,response.body.split(",")[7].split('"title": "')[1].length - 1);
          let ytviews = response.body.split('viewCount": "')[1].split('"')[0];
          let ytlikes = response.body.split('likeCount": "')[1].split('"')[0];
          let ytdislikes = response.body.split('dislikeCount": "')[1].split('"')[0];
          let ytcomments = response.body.split('commentCount": "')[1].split('"')[0];

          let vidStatsEmbed = new MessageEmbed()
          .setTitle(`YT VIDEO STATS`)
          .setFooter(message.author.username, message.author.displayAvatarURL())
          .setColor('RED')
          .addField(`ID`, ytid)
          .addField(`TITLE`, ytvidname)
          .addField(`VIEWS`, ytviews)
          .addField(`LIKES`, ytlikes)
          .addField(`DISLIKES`, ytdislikes)
          .addField(`COMMENTS`, ytcomments);
          message.channel.send(vidStatsEmbed);
      });

  //------- end request

}
