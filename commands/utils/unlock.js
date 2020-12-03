module.exports = {
  name: "unlock",
  aliases: ['uch', 'ul', 'ulch'],
  catergory: "moderation",
  description: "Unlock a channel so that everyone can speak in it.",
  usage: "unlock [reason]",
  run: async (Discord, bot, message, args) => {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null }).catch(e => {
  console.log(e);
  message.author.send("I couldn't unlock the channel. Please try again.")
});
message.channel.send(`🔒 This channel has been unlocked by a member of staff for reason: ${message.content.substring(8)}`);
    }
  }
}
