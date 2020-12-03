const mongoose = require('mongoose');
const Autopost = require('./models/autopost.js');
const Discord = require('discord.js');
const cron = require('node-cron');
const request = require('request'); const cheerio = require('cheerio');
module.exports = async function(bot, first) {
  if(first) {
  const runningPosts = await Autopost.findRunning();
  for(let post of runningPosts) {
    let name = post.name;
    let guild = post.guild;
    let channel = post.channel;
    if(post.running) {
      cron.schedule('0 13 * * *', () => {
        bot.commands.get(name).run(Discord, bot, {channel: bot.guilds.cache.get(guild).channels.cache.get(channel), author: {tag: 'autopost magic'}}, [name]);
      }, {
        scheduled: true,
        timezone: "America/Los_Angeles"
      })
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
                return;
            }
            $ = cheerio.load(responseBody);

        });

    //------- end request

  }
  cron.schedule('50 12 * * *', () => {
    restartDynos();
  }, {
    scheduled: true,
    timezone: "America/Los_Angeles"
  });
} // if the bot is restarting, schedule autoposts. if it's not, only change the activity

  const servers = bot.guilds.cache.array().length;
  const arr = [
    {activity: { type: 'STREAMING', url: 'https://twitch.tv/morningmax27', name: '>help or ping the bot' }, status: 'dnd'}, //morningmax27 speedruns Breath of The Wild and other random stuff, you should check him out
    {activity: { type: 'WATCHING', name: `${servers} servers`}, status: 'online'},
    {activity: { type: 'LISTENING', name: 'nobody'}, status: 'dnd'},
    {activity: { type: 'PLAYING', name: 'Minecraft'}, status: 'idle'}
  ];

  const presence = arr[Math.floor(Math.random() * arr.length)];
  console.log(presence);
    bot.user.setPresence(presence).then(p => {
        return true;

    }).catch(e => {
        console.warn(e);
        return false;
    });
}
