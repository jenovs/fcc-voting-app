const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  votes: [{
    pick: {
      type: String,
      trim: true,
      minlength: 1,
      default: "Vote!"
    },
    count: {
      type: Number,
      default: 0
    }
  }]
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = {Poll};
