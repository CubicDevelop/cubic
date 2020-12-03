module.exports = {
  name: "lock",
  aliases: ['lch'],
  catergory: "moderation",
  description: "Lock a channel from members being able to talk in it. Useful in case of a raid or bot going down.",
  usage: "lock [reason]",
  run: async (Discord, bot, message, args) => {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false }).catch(e => {
  console.log(e);
  message.author.send("I couldn't lock the channel. Please try again.")
});
message.channel.send(`🔒 This channel has been locked by a member of staff for reason: ${message.content.substring(6)}`);
    }
  }
}
