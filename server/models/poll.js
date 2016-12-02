const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  voteOption: [{
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    count: {
      type: Number,
      default: 0
    }
  }]
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = {Poll};
