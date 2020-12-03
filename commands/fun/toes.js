// joke

module.exports = {
  name: "toes",
  aliases: ['feet'],
  ignored: true,
  catergory: "joke",
  description: "no toes",
  usage: "toes",
  run: async (Discord, bot, message, args) => {
const toes = ['424699368835121163', '730798541177487401', '439172671922503699'];
if(toes.findIndex(u => u === message.author.id) === -1) {
  return;
}
if(message.channel.nsfw) {
  message.channel.send('coming soon'); // not actually coming soon, unless soon === never
} else {
message.channel.send('no');
}
}
}
