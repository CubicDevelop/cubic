require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const info = require('./config.json');
const fs = require('fs');
const owner = require('./ownerCheck.js');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.catergories = fs.readdirSync('./commands');
bot.prefixes = new Discord.Collection();
bot.dogs = new Discord.Collection();
bot.cats = new Discord.Collection();
const slurs = require('./filters/slurs.js');
const swears = require('./filters/swear.js');
const ready = require('./ready.js');
const servers = bot.guilds.cache.size;

["command"].forEach(handler => {
  require(`./handler/${handler}`)(bot);
});
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_LOGIN}@cubebot-data.ppfya.mongodb.net/prefix?w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false
});

//-------------------------------------------->
const Prefix = require('./models/prf.js');
//==============================================
// Ready
//==============================================
bot.on('ready', async() => {
  ready(bot, true).catch(e => {
    return console.log(e);
  });
  console.log('Ready!');
});

//==============================================
// Message
//==============================================
bot.on('message', async message => {
  if(message.author.bot) {
    return;
  }
  //---------------------------------------------> One in 70 chance to change the status
  const random = Math.floor(Math.random() * 70);
  if(random === 69) {
    ready(bot, false);
  }
  //---------------------------------------------> If in dm

  if(message.channel.type === 'dm') {
    if(owner(message)) {
  if (!info.disabled) {
    let args = message.content.split(" ");
    if(args[0].toLowerCase().length === 0) return;
  let command = bot.commands.get(args[0].toLowerCase());
  if(!command) command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()));
  if(command) {
    command.run(Discord, bot, message, args).catch(e => {
      message.channel.send('This command is not compatible with dms, most likely due to the code requiring information about the server. Please go to a server and try again.');
    });
      }
    }
    return;
  } else {
    return;
  }
}

//--------------------------------------------> Word filter (by sysollie)

/* const filtered = ['jsakdjsdhjisdhoaishdoashdoasidhosh', 'iahwhwodhsoidhoaihowh'];
if(!message.member.hasPermission('MANAGE_MESSAGES')) {
  if(filtered.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w} `))) {
    message.delete({
      reason: 'Contains filtered word'
    }).catch(e => {
      console.warn(e);
    });
    const embed = new Discord.MessageEmbed()
    .setDescription(`${message.member.displayName}, that word is not allowed here!`)
    .setColor(0xFF0000);
    return message.channel.send(embed);
  }
}*/

//------------------------------------------> Get prefix
let gPrefix = bot.prefixes.get(message.guild.id); // see if the bot has already cached the server's data
if(!gPrefix) { // if not, contact the database, and cache the data
gPrefix = await Prefix.findGuild(message.guild.id);
bot.prefixes.set(message.guild.id, gPrefix);
}
if(!gPrefix[0]) { // if there is no saved data in the database, save some data
  const newPrefix = new Prefix({
    prefix: '>',
    name: message.guild.name,
    guild: message.guild.id,
    slurs: false,
    swears: false,
    premium: false,
    posts: 0
  });
  gPrefix[0] = await newPrefix.save().catch(err => console.log(err));
}
if(!gPrefix) {
return message.channel.send('There was a major issue while trying to get bot data. Please contact LordOfTheCube#0419 for help.')
}
//------------------------------------------> If bot pinged
const pinged = ['<@728389297341726840>', '<@!728389297341726840>'];
if(pinged.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w} `))) {
  if(info.disabled) {
    const disabledMsg = await message.channel.send('I am currently disabled.');
    return disabledMsg.delete({
      timeout: 5000
    });
  }
  const prefixMsg = await message.channel.send(`My prefix for **${message.guild.name}** is \`${gPrefix[0].prefix}\`.`);
  return prefixMsg.delete({
    timeout: 5000
  });
}
//---------------------------------------> If slur filter enabled (filter by sysollie)
if(gPrefix[0].slurs) {
  if(!message.member.hasPermission('MANAGE_MESSAGES')) {
    if(slurs.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w} `))) {
      message.delete({
        reason: 'Contains slur'
      }).catch(e => {
        console.warn(e);
      });
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${message.member.displayName}**, racial slurs are not allowed in this server!`)
      .setColor(0xFF0000);
      return message.channel.send(embed);
    }
  }
}
//---------------------------------------> If swear filter enabled (filter by sysollie)
if(gPrefix[0].swears) {
  if(!message.member.hasPermission('MANAGE_MESSAGES')) {
    if(swears.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w} `))) {
      message.delete({
        reason: 'Contains slur'
      }).catch(e => {
        console.warn(e);
      });
      const embed = new Discord.MessageEmbed()
      .setDescription(`**${message.member.displayName}**, swear words are not allowed in this server!`)
      .setColor(0xFF0000);
      return message.channel.send(embed);
    }
  }
}
//---------------------------------------> If starts with prefix, run the command
if(info.beta) { // if i'm running the beta copy, the prefix automatically converts to _
  gPrefix[0].prefix = '_';
}
//--------------------------------------->
if(message.content.startsWith(gPrefix[0].prefix)) { // if it starts with the prefix

  let args = message.content.substring(gPrefix[0].prefix.length).split(" ");
  if(args[0].toLowerCase().length === 0) return;

if(info.disabled) { // if the bot is disabled (almost never is, and the implementation is bad so idk)
  switch(args[0]) {
    case "enable": // anyone can run this, but i never disable the bot so it doesn't matter atm, will probably just delete this feature

    const newInfo = info;
    newInfo.disabled = false;
    fs.writeFileSync('config.json', JSON.stringify(newInfo,null,2), fin());
    function fin() {
      bot.user.setStatus('online');
      return message.channel.send("I'm back!");
    }
    break;
  }
}
else {

let command = bot.commands.get(args[0].toLowerCase());
if(!command) command = bot.commands.get(bot.aliases.get(args[0].toLowerCase())); // get aliases
if(command) {
  command.run(Discord, bot, message, args).catch(e => { // i am aware that i pass Discord into the command handler, i will fix this soon
    if(command.name === 'convert') { // if there was an error with the convert command
      return message.channel.send(`Those are either not units, or not compatible with each other. Do ${gPrefix[0].prefix}convert help for more info`);
    } else if (command.name === 'conjugate') { // if there was an error with the conjugate command
      console.warn(e);
      return message.channel.send(`Either your verb or your tense was invalid. Please do ${gPrefix[0].prefix}conjugate for more info on how to use the command.`);

    } // otherwise, give a generic error
    message.channel.send(`There was an error, and I couldn\'t run the ${command.name} command.`);
    console.warn(e);
  });
    }
  }
}
//------------------------------------->
});

bot.on('messageReactionAdd', async (reaction, user) => {
  if(!reaction.message.guild.id == "634078414332231681") return;
  const channel = reaction.message.guild.channels.cache.get("820147312055287828");
  if(!channel) return;
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setFooter(user.id + ", " + reaction.message.id)
  .setThumbnail(user.displayAvatarURL())
  .setDescription(`Reaction of ${reaction.emoji} (${reaction.emoji.id}) from ${user.tag} (${user.id}) in ${reaction.message.channel} (${reaction.message.channel.id})`);
  channel.send(embed);
})

bot.login(process.env.BOT_TOKEN);
