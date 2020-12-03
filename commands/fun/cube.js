module.exports = {
  name: "cube",
  aliases: ['rubiks', 'speedcube'],
  catergory: "fun",
  description: "See someone solve a rubiks cube... really fast",
  usage: "cube [info (optional)]",
  run: async (Discord, bot, message, args) => {
    const links = [
      'https://www.youtube.com/watch?v=MScD83xx3DQ',
      'https://www.youtube.com/watch?v=Zb4H5jCocW0',
      'https://www.youtube.com/watch?v=P_3iFSfHXXc',
      'https://www.youtube.com/watch?v=aJBwQncdIIE',
      'https://www.youtube.com/watch?v=hPse8rIlF0U',
      'https://www.youtube.com/watch?v=ISY1lgP0BLQ',
      'https://www.youtube.com/watch?v=U-rcPAsY5bY'
    ];
    if(args[1] === 'info') {
      message.channel.send(`${links.length} links, some 2x2, 3x3 and 4x4. If you want me to add any links, use the suggest command.`);
    } else {
      message.channel.send(links[Math.floor(Math.random() * links.length)]);
    }
}
}
