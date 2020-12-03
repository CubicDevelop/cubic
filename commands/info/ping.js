module.exports = {
  name: 'ping',
  catergory: 'info',
  description: 'Find the bot\'s ping',
  usage: 'ping',
  run: async (Discord, bot, message, args) => {
    message.reply(`Pong!\n${bot.ws.ping}ms`);
  }
}
