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
      default: "Vote Me!"
    },
    count: {
      type: Number,
      default: 0
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }]
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;
