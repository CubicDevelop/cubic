module.exports = {
  name: "kick",
  aliases: [],
  catergory: "moderation",
  description: "Kick someone from the server",
  usage: "kick [user] [reason]",
  run: async (Discord, bot, message, args) => {
    if(message.member.hasPermission("KICK_MEMBERS")) {
      if (!args[1]) {
        message.reply('Please specify a user!');
        return;
      }
      const user = message.mentions.users.first();
      if(user) {
        const member = message.guild.member(user);
        if(member) {
          if(member.hasPermission('KICK_MEMBERS') && (message.guild.ownerID !== user.id)) return message.reply('You cannot kick that member!');
          member.kick(args.slice(2).join(' ')).then(() => {
            message.reply(`I have kicked **${user.tag}**`);
          }).catch(err => {
            message.reply("I was unable to kick that member. They may have higher roles or be the server owner.");
            console.log(err);
          });
        }
      }
    } else {
      message.reply("You do not have permission to do that!!1!1!!");
    }
}
}
