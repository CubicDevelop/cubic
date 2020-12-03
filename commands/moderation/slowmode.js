module.exports = {
  name: 'slowmode',
  aliases: ['slm', 'slow', 'rlpu', 'rateLimitPerUser'],
  catergory: 'moderation',
  description: 'Find or change a channel\'s slowmode',
  usage: 'slowmode [seconds (optional)]',
  run: async (Discord, bot, message, args) => {
    if(message.member.hasPermission('MANAGE_MESSAGES')) {
    if(args[1]) {
    if(!isNaN(args[1])) {
      if(args[1] % 1 === 0) {
        if(args[1] <= 21600) {
          try {
            message.channel.setRateLimitPerUser(args[1]);
            return message.channel.send(`The slowmode has been changed to **${args[1]}** seconds.`);
          } catch {
            return message.channel.send("I couldn't do that. Please make sure I have the `MANAGE_CHANNELS` permission and try again.");
          }
        } else {
          return message.reply('That number is too large!');
        }
      } else {
        return message.reply('You must provide a whole number!');
      }
    } else {
      return message.reply('You must provide a number!');
    }
  } else {
    message.channel.send(`The current slowmode is **${message.channel.rateLimitPerUser}** seconds.`);
  }
} else {
  return message.reply("You don't have permission to use this command!");
}
  }
}
