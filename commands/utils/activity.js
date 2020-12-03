const ready = require('../../ready.js');
const owner = require('../../ownerCheck.js');

module.exports = {
  name: 'activity',
  aliases: ['act'],
  catergory: 'utils',
  ignored: true,
  description: 'Change the bot\'s activity.',
  usage: 'activity',
  run: async (Discord, bot, message, args) => {
if(!owner(message)) {
  return;
}
    ready(bot);
  }
}
