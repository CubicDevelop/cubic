module.exports = {
  name: "say",
  aliases: ['bc', 'broadcast'],
  catergory: "utils",
  description: "Make the bot say anything you want, include `-delete` at the end to delete your original message.",
  usage: "say [message]",
  run: async (Discord, bot, message, args) => {
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      args.shift();
      let msg = args.join(" ")
    if (msg.includes('-delete')) {
      try {
      message.delete();
    } catch {
      const couldntDelete = await message.channel.send('I couldn\'t delete that message. (This one will delete itself in 5 seconds)');
      couldntDelete.delete({
        timeout: 5000
      })
    }
    }

    return await message.channel.send(msg.split('-delete')[0], { allowedMentions: { parse: ["users"] } });
  } else {
    const reply = await message.reply('You must have the `MANAGE_MESSAGES` permission to use this command.');
    reply.delete({
      timeout: 5000
    });
  }
}
}
