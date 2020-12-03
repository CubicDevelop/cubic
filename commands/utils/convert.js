const convert = require('convert-units');

module.exports = {
  name: "convert",
  aliases: ['c', 'conversion'],
  catergory: "utils",
  description: "Convert between 2 different units!",
  usage: "convert help",
  run: async (Discord, bot, message, args) => {

    if (args[1] === 'help') {
      let embed = new Discord.MessageEmbed()
                  .setTitle('Convert Help')
                  .setTimestamp()
                  .setColor(0xFF99FF)
                  .addField(`Usage`, `convert [measurement] [old unit] [new unit]`)
                  .addField(`Supported Units`, `The following units are supported: mm, cm, m, km, in, yd, ft-us, ft, mi, mm2, cm2, m2, ha, km2, in2, yd2, ft2, ac, mi2, mcg, mg, g, kg, mt, oz, lb, t, mm3, cm3, ml, cl, dl, l, kl, m3, km3, krm, tsk, msk, kkp, glas, kanna, tsp, Tbs, in3, fl-oz, cup, pnt, qt, gal, ft3, yd3, ea, dz, C, K, F, R, ns, mu, ms, s, min, h, d, week, month, year, b, Kb, Mb, Gb, Tb, B, KB, MB, GB, TB, ppm, ppb, ppt, ppq, m/s, km/h, m/h, knot, ft/s, min/km, s/m, min/mi, s/ft, Pa, kPa, MPa, hPa, bar, torr, psi, ksi, A, mA, kA, V, mV, kV, W, mW, kW, MW, GW, VAR, mVAR, kVAR, MVAR, GVAR, VA, mVA, kVA, MVA, GVA, Wh, mWh, kWh, MWh, GWh, J, kJ, VARh, mVARh, kVARh, MVARh, GVARh, mm3/s, cm3/s, ml/s, cl/s, dl/s, l/s, l/min, l/h, kl/s, kl/min, kl/h, m3/s, m3/min, m3/h, km3/s, tsp/s, Tbs/s, in3/s, in3/min, in3/h, fl-oz/s, fl-oz/min, fl-oz/h, cup/s, pnt/s, pnt/min, pnt/h, qt/s, gal/s, gal/min, gal/h, ft3/s, ft3/min, ft3/h, yd3/s, yd3/min, yd3/h, lx, ft-cd, mHz, Hz, kHz, MHz, GHz, THz, rpm, deg/s, rad/s, rad, deg, grad, arcmin, arcsec`)
                  .addField(`More Info`, `You must convert 2 compatible units: e.g. you can convert km/h to m/s (both speed), but you cannot convert m2 to in3 (one is area, one is volume).`);
                  return message.channel.send(embed);
    }
    if(args.length < 4) {
  let embed666 = new Discord.MessageEmbed()
                  .setDescription(`Usage: convert [measurement] [old unit] [new unit]`)
                  .setColor(0xFF0000);
                  message.reply(embed666);
                  return;
}
    const number = args[1];
    const unit1 = args[2];
    const unit2 = args[3];
    let conversion = convert(number).from(unit1).to(unit2);
    message.channel.send(conversion.toString() + unit2);
}
}
