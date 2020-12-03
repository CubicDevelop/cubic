const { getConjugation } = require('french-verbs');
const list = require('french-verbs-lefff');


module.exports = {
  name: 'conjugate',
  aliases: ['conj'],
  catergory: 'fun',
  description: 'Conjugate any French verb.',
  usage: 'conjugate [tense] [infinitive]',
  run: async (Discord, bot, message, args) => {
    if(!args[1]) {
      const embed = new Discord.MessageEmbed()
      .setColor(0xFF99FF)
      .addField('Usage', 'conjugate [tense] [infinitive]')
      .addField('Tense', 'Here are the accepted tenses:\nPRESENT, FUTUR, IMPARFAIT, PASSE_SIMPLE, CONDITIONNEL_PRESENT, IMPERATIF_PRESENT, SUBJONCTIF_PRESENT, SUBJONCTIF_IMPARFAIT, PASSE_COMPOSE, PLUS_QUE_PARFAIT\n Caps, underscores and accents do not matter.')
      .addField('Infinitive', 'The infitive form of a french verb always ends in either « er », « ir » or « re ». Example: « avoir ». Example: « manger ».')
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
      return message.channel.send(embed);
    } else
    if(args.length < 3) {
      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription('Usage: conjugate [tense] [infinitive]')
      .setTimestamp()
      .setFooter(' ', message.author.displayAvatarURL());
      return message.channel.send(embed);
    }
      const pronouns = ['**je** ', '**tu** ', '**il/elle/on** ', '**nous** ', '**vous** ', '**ils/elles** '];
      let output = '';
      let verbs = [];
      let attempts = 1;
      let success = false;
      verbs[0] = args[2];
      if(args[3]) {
        verbs[0] += ' ';
        verbs[0] += args[3];
      }
      verbs[1] = args[3];
      if(args[4]) {
        verbs[1] += ' ';
        verbs[1] += args[4];
      }
      if(!args[4]) {
        args.push('e');
      }

      verbs[2] = args[4];
      if(args[5]) {
        verbs[2] += ' ';
        verbs[2] += args[5];
      }
      let tense1 = args[1].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let tense2 = args[2].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let tense3 = '';
      if(args[3]) {
      tense3 = args[3].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
      tenses = [tense1, tense1 + '_' + tense2, tense1 + '_' + tense2 + '_' + tense3];
      for(let i = 0; i < 6; i++) {
        output+= pronouns[i];
        for(let j = 0; j < 3; j++) {
          for(let k = 0; k < 3; k++) {

            try {
              if(!success) {
              output += getConjugation(list, verbs[j], tenses[k], i);
              success = true;
            }
            } catch {
                attempts++;
            }
          }
        }
        if(!success) {
          return message.channel.send('Either your verb or your tense was invalid. Please do >conjugate for more info on how to use the command.');
        }
        success = false;
        output += '\n'
      }

      const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(output)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setTimestamp();
      message.channel.send(embed);
  }
}
