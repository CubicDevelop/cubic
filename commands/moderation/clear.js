module.exports = {
  name: "clear",
  aliases: ['cl'],
  catergory: "moderation",
  description: "Clear messages",
  usage: "clear [number]",
  run: async (Discord, bot, message, args) => {
    if(message.member.hasPermission('MANAGE_MESSAGES')) {
      let toDelete = args[1];
      if(!isNaN(toDelete)) {
        toDelete++;
        return message.channel.bulkDelete(toDelete).catch(e => {
          message.channel.send('I couldn\'t delete those messages. Normally, this is because you cannot bulk delete messages that are over 2 weeks old.');
        });
      } else {
        return message.channel.send('You must provide a number of messages to delete.');
      }

    } else {
      const permMsg = await message.reply("You do not have permission to do that!!1!1!!");
      if(permMsg.deleteable) {
      return permMsg.delete({
        timeout: 5000
      });
    } else {
      return;
      }
    }
}
}
