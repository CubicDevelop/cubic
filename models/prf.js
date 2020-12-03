const mongoose = require('mongoose');

const prefixSchema = mongoose.Schema({
  prefix: String,
  name: {
    type: String,
    default: 'no server name found',
  },
  guild: {
    type: String,
    unique: true
  },
  slurs: Boolean,
  swears: Boolean,
  premium: {
    type: Boolean,
    default: false
  },
  posts: Number,
  problems: {
    type: {},
    default: null
  }
});

prefixSchema.statics.findGuild = function(id) {
  return this.find({guild: id});
}

module.exports = mongoose.model('Prefix', prefixSchema)
