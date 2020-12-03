module.exports = {
  name: "ban",
  aliases: [],
  catergory: "moderation",
  description: "ban someone",
  usage: "ban [user] [reason]",
  run: async (Discord, bot, message, args) => {
    if(message.member.hasPermission("BAN_MEMBERS")) {
      if (!args[1]) {
        const noUser = await message.reply('Please specify a user!');
        return noUser.delete({
          timeout: 5000
        });
      }
      const user = message.mentions.users.first();
      if(user) {
        const member = message.guild.member(user);
        if(member) {
          if(member.hasPermission('BAN_MEMBERS') && (message.guild.ownerID !== user.id)) return message.reply('You cannot ban that member!'); // not a good implementation
          member.ban({
            reason: args.slice(2).join(' ')
          }).then(() => {

            message.reply(`I have banned **${user.tag}**`);
          }).catch(err => {
            message.reply("I was unable to ban that member. They may have higher roles or be the server owner.");
            console.log(err);
          });
        }
      }
    } else {
      const noPerms = await message.reply("You do not have permission to do that!!1!1!!");
      return noPerms.delete({
        timeout: 5000
      });
    }
}
}
