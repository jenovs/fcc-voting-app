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
      default: "Vote Me!",
      _creator: mongoose.Schema.Types.ObjectId,
    },
    count: {
      type: Number,
      default: 0
    }
  }],
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  votedUsers: {
    type: Array
  },
  votedIps: {
    type: Array
  }
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;
