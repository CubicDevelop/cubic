const mongoose = require('mongoose');
const Prefix = require('../../models/prf.js');
const Autopost = require('../../models/autopost.js');
const cron = require('node-cron');

module.exports = {
  name: "autopost",
  aliases: ['ap'],
  catergory: "utils",
  description: "Set up auto-posting things such as images and facts! They run once per day at 1pm Los Angeles time, but the ability to change the frequency of them is hopefully coming soon. **PREMIUM SERVERS ONLY**",
  usage: "autopost",
  run: async (Discord, bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
      return message.reply('You must have the `MANAGE CHANNELS` permission to set up autoposting!');
    }
    let guildInfo = await Prefix.findGuild(message.guild.id);
    guildInfo = guildInfo[0];
    if(!guildInfo) {
      console.warn(`Couldn't get data from mongodb
      Command: autopost
      Time: ${Date.now()}`);
      return message.reply('There was an error while getting the autopost data.');
    }
    if(!guildInfo.premium) {
      return message.channel.send('The server must be premium for you to set up autoposting!');
    }

    if(!args[1]) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`You currently have ${guildInfo.posts} out of 3 autoposts on **${message.guild.name}** (${3 - guildInfo.posts} remaining).\nTo set up an autopost, you can do: ${guildInfo.prefix}autopost (post name). To start or stop an autopost, do ${guildInfo.prefix}autopost start/stop (id). To delete an autopost, do ${guildInfo.prefix}autopost delete (id). Available posts are:\nFacts: post one fact per day.\nDog: post an image of a dog every day (ability to set time interval coming soon).\nCat: post an image of a cat once per day (ability to set time interval coming soon).`)
      .setTimestamp()
      .setColor(0xFF99FF)
      .setThumbnail(message.guild.iconURL());
      return message.channel.send(embed);
    }
    let post;
    switch(args[1]) {
      case "facts":
      if(guildInfo.posts > 3) {
        return message.channel.send('You already have 3 autoposts on this server. Delete one and try again.');
      }
      let newPost = new Autopost({
        name: 'fact',
        id: message.id,
        message: [],
        running: false
      });
      guildInfo.posts++;
      newPost = await newPost.save().then(() => {
        message.channel.send(`I have created a new Autopost for facts with the id \`${message.id}\`. You will need the id in order to start, stop or delete this autopost, so keep it somewhere safe. You can always request the id from the developer at any time.`);
      }).catch(e => {
        console.warn(e);
        return message.channel.send("I couldn't save that. Please try again soon, and if it still doesn't work feel free to contact the developer.");

      });
      guildInfo = await guildInfo.save().catch(e => {console.warn(e);return message.channel.send("I couldn't save that. Please try again soon, and if it still doesn't work feel free to contact the developer.");});


      break;
      case "dog":
      if(guildInfo.posts > 3) {
        return message.channel.send('You already have 3 autoposts on this server. Delete one and try again.');
      }
      let newPost1 = new Autopost({
        name: 'dog',
        id: message.id,
        message: [],
        running: false
      });
      guildInfo.posts++;

      newPost1 = await newPost1.save().then(() => {
        message.channel.send(`I have created a new Autopost for dogs with the id \`${message.id}\`. You will need the id in order to start, stop or delete this autopost, so keep it somewhere safe. You can always request the id from the developer at any time.`);
      }).catch(e => {
        console.warn(e);
        return message.channel.send("I couldn't save that. Please try again soon, and if it still doesn't work feel free to contact the developer.");

      });
      guildInfo = await guildInfo.save().catch(e => {console.warn(e);return message.channel.send("I couldn't save that. Please try again soon, and if it still doesn't work feel free to contact the developer.");});
      break;
      case "cat":
      if(guildInfo.posts > 3) {
        return message.channel.send('You already have 3 autoposts on this server. Delete one and try again.');
      }
      let newPost2 = new Autopost({
        name: 'cat',
        id: message.id,
        message: [],
        running: false
      });
      guildInfo.posts++;

      newPost2 = await newPost2.save().then(() => {
        message.channel.send(`I have created a new Autopost for cats with the id \`${message.id}\`. You will need the id in order to start, stop or delete this autopost, so keep it somewhere safe. You can always request the id from the developer at any time.`);
      }).catch(e => {
        console.warn(e);
        return message.channel.send("I couldn't save that. Please try again soon, and if it still doesn't work feel free to contact the developer.");

      });
      guildInfo = await guildInfo.save().catch(e => {console.warn(e);return message.channel.send("I couldn't save that. Please try again soon, and if it still doesn't work feel free to contact the developer.");});
      break;
      case "start":
      if(!args[2]) {
        return message.reply("You must specify an id!");
      }
      let updating = await Autopost.findOne({ id: args[2]});

      if(!updating) {
        return message.channel.send("I couldn't find that autopost!");
      }
      let channel = message.channel;
      updating.running = true;
      updating.channel = channel;
      updating.guild = message.guild;
      let name = updating.name;
      updating.save().then(() => {
        cron.schedule('0 13 * * *', () => {
          bot.commands.get(name).run(Discord, bot, message, args);
        }, {
          scheduled: true,
          timezone: "America/Los_Angeles"
        });
        message.channel.send(`I have started a new autopost for \`${updating.name}s\` in this channel. It will run once per day.`)
      }).catch(e => {
        console.warn(e);
        return message.channel.send(`I couldn't save that! Please try again, and if the errors persist, feel free to contact a developer.`);
      });

      break;
      case "stop":
      if(!args[2]) {
        return message.reply("You must specify an id!");
      }
      let updating1 = await Autopost.findOne({ id: args[2]});

      if(!updating1) {
        return message.channel.send("I couldn't find that autopost!");
      }
      updating1.running = false;
      updating1.message = null;
      updating1.channel = null;
      updating1.guild = null;
      updating1.save().then(() => {
        message.channel.send(`I have stopped the \`${updating1.name}s\` autopost with id \`${updating1.id}\`in this channel. It will no longer run.`)
      }).catch(e => {
        console.warn(e);
        return message.channel.send(`I couldn't save that! Please try again, and if the errors persist, feel free to contact a developer.`);
      });
      break;
      case "delete":
      if(!args[2]) {
        return message.reply("You must specify an id!");
      }
      guildInfo.posts--;
      let updating2 = await Autopost.findOne({id: args[2]});
      Autopost.deleteOne({id: args[2]}).then(() => {
        message.channel.send(`I have deleted the \`${updating2.name}s\` autopost with id \`${updating2.id}\`.`)
      }).catch(e => {
        console.warn(e);
        return message.channel.send(`I couldn't do that! Please try again, and if the errors persist, feel free to contact a developer.`);
      });
      guildInfo = await guildInfo.save().catch(e => {console.warn(e);return message.channel.send("I couldn't do that. Please try again soon, and if it still doesn't work feel free to contact the developer.");});


      break;
    }
  }
}
