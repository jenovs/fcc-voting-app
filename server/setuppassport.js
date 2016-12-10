'use strict';

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('./models/user');

// Create new GitHubStrategy
passport.use(new GitHubStrategy({
  clientID: process.env.GIT_CLIENT_ID,
  clientSecret: process.env.GIT_CLIENT_SECRET,
  callbackURL: process.env.GIT_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  // If successfull authentication by GitHub,
  // profile will have user profile data.
  // Do business logic and call done(err, data)
  const user = new User({
    username: profile.username,
    gitId: +profile.id
  });

  // Call custom function to check if user is in db, add if not
  User.findOrCreate(user).then(user => {
    return done(null, user);
  })
    .catch(e => console.log(e))
}));

module.exports = function() {
  passport.serializeUser((user, done) => {
    console.log('in serializeUser');
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    console.log('in deserializeUser');
    User.findOne({_id}, (err, user) => {
      done(err, user);
    });
  });
};
