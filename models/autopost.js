const mongoose = require('mongoose');

const autoPostSchema = mongoose.Schema({
  name: String,
  id: {
    type: String,
    unique: true
  },
  running: {
    type: Boolean,
    default: false
  },
  channel: {
    type: {}
  },
  guild: {
    type: {}
  }
});

autoPostSchema.statics.findRunning = function() {
  return this.find({running: true});
}

module.exports = mongoose.model('Posts', autoPostSchema)
