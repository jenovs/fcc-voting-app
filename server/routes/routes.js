'use strict';

const router = require('express').Router();
const passport = require('passport');

const db = require('./../db/queries');
const User = require('./../models/user');

// populate local variables
router.use((req, res, next) => {
  // console.log('req.user', req.user);
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'You must be logged in to see this page.');
    res.redirect('/');
  }
}

// Call to start GitHub authentication
router.get('/auth/github', passport.authenticate('github'));

// GitHub callback url specified in GitHubStrategy
router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
  // req.user gets populated by passport
  // console.log('/auth/github/callback', req.user);
  // res.redirect(`/users/${req.user.username}`);
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/users/:username', (req, res, next) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (err) return next(err);
    if (!user) return next(404);
    res.render('profile', {user});
  });
});

router.get('/', (req, res) => {
  res.render('index');
})
// Get list of all polls
router.get('/polls', db.getAllPolls)

// Get specific poll by id
router.get('/polls/:id', db.getOnePoll);

// Create a new poll
router.post('/polls', db.createNewPoll);

// Update a poll by id
router.patch('/polls/:id/:vote', db.votePoll);

// Add vote options to the poll
router.patch('/polls/:id', db.addPicks);

// Delete poll by id
router.delete('/polls/:id', db.deleteOnePoll);

module.exports = router;
