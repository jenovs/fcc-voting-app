'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  gitId: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
});

// Check if user exists in db and create it if not
UserSchema.statics.findOrCreate = function (user) {
  const User = this;
  // Use return so it can be chained with .then() in called function
  return User.findOne({gitId: user.gitId}).then(doc => {
    // if user doesn't exist, create and return as Promise
    if (!doc) {
      return new Promise((resolve, reject) => {
        user.save().then(res => resolve(res))
      });
    }
    // if user exists, return as Promise
    return Promise.resolve(doc);
  }).catch(e => console.log(e));
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
