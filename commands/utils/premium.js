const owner = require('../../ownerCheck.js');
const mongoose = require('mongoose');
const Prefix = require('../../models/prf.js');
module.exports = {
  name: 'premium',
  aliases: ['pre'],
  catergory: 'utils',
  ignored: true,
  description: 'Update a server\'s premium status',
  usage: 'premium',
  run: async (Discord, bot, message, args) => {
if(!owner(message)) {
  return;
}
let guild = await Prefix.findOne({guild: message.guild.id});
console.log(guild);
if(!guild.premium) {
guild.premium = true;

} else {
  guild.premium = false;
}
guild = await guild.save().catch(e => {
  console.log(e);
  message.author.send('There was an error');
})
message.author.send(`${message.guild.name}'s premium status is now ${guild.premium}`);
  }
}
