const owner = require('../../ownerCheck.js');
const request = require('request');
const cheerio = require('cheerio');
module.exports = {
  name: 'restart',
  aliases: ['rst', 'reload'],
  catergory: 'utils',
  ignored: true,
  description: 'Restart the bot\'s server, no response will be given',
  usage: 'restart',
  run: async (Discord, bot, message, args) => {
if(!owner(message)) {
  return;
}
  message.channel.send('✅ Restarting bot! Do not expect a response.').then(m => {
    restartDynos();
  });
  }
}


function restartDynos(){

      var options = {
          url: `https://api.heroku.com/apps/cube-bot1/dynos`,
          method: "DELETE",
          headers: {
              "Accept": "application/vnd.heroku+json; version=3",
              "Authorization" : `Bearer ${process.env.H_TOKEN}`
          }
      };

  //---------- request data
      request(options, function(error, response, responseBody) {
          if (error) {
            console.log("Could not restart dynos");
            message.channel.send("Could not restart dynos.");
              return;
          }
          $ = cheerio.load(responseBody);

      });

  //------- end request

}
