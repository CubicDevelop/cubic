const isOwner = require('../../ownerCheck.js');


module.exports = {
  name: 'role',
  aliases: ['promote', 'addr', 'addrole'],
  ignored: true,
  catergory: 'info',
  description: 'Find the bot\'s ping',
  usage: 'ping',
  run: async (Discord, bot, message, args) => {
    if(isOwner(message)) {

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return;

    let role = message.mentions.roles.first();

    if(!role) role = message.guild.roles.cache.get(args[1]);

    if(!role) role = message.guild.roles.cache.find(r => r.name.toLowerCase().startsWith(args[1].toLowerCase()));

    if(!role) return message.channel.send(`I couldn't find that role.`);

    let user = message.mentions.users.first();
    user = message.guild.member(user);

    if(!user) user = message.guild.members.cache.get(args[2]);
    if(!user) user = message.guild.members.cache.find(r => r.user.tag.toLowerCase() == args[2].toLowerCase());

    if(!user) user = message.guild.members.cache.find(u => u.displayName.toLowerCase() == args[2].toLowerCase());
    if(!user)  return message.channel.send(`I couldn't find that user.`);
    if(user.roles.cache.get(role.id)) {
      user.roles.remove(role, `Command issued by ${message.author.tag}.`).catch(e => {
        console.warn(e);
        return message.channel.send(`I couldn't remove that role, most likely because it is higher than my highest ranked role, or it is managed by an intergration (like server booster roles).`);
      });
      return message.channel.send(`The role **${role.name}** has been removed from **${user.tag}**`);
    }
    user.roles.add(role, `Command issued by ${message.author.tag}.`).catch(e => {
      console.warn(e);
      return message.channel.send(`I couldn't give that role, most likely because it is higher than my highest ranked role, or it is managed by an intergration (like server booster roles).`);
    });
    user.send(`You have been given the **${role.name}** role in **${message.guild.name}**`).catch(e => {
      console.warn(e);
      return message.channel.send(`I couldn't dm ${user.user.tag}.`);
    });
    message.channel.send(`**${user.user.tag}** has been given the role **${role.name}**`)
    }
  }
}
