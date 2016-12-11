'use strict';

const router = require('express').Router();
const passport = require('passport');

const db = require('./../db/queries');
const User = require('./../models/user');
const api = require('./api_v1')

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

router.get('/users/:id', (req, res, next) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if (err) return next(err);
    if (!user) return next(404);
    res.render('pages/profile', {user});
  });
});

router.get('/', (req, res) => {
  console.log('remoteAddress:', req.connection.remoteAddress);
  console.log('ip:', req.ip);
  res.render('pages/index');
});

router.get('/poll/:id', (req, res) => {
  res.render('pages/poll', {id: req.params.id});
});

router.get('/polls/:id', (req, res) => {
  res.render('pages/result', {id: req.params.id});
});

router.get('/vote/:id', (req, res) => {
  res.render('pages/vote', {id: req.params.id});
});

router.use('/api/v1', api)

module.exports = router;
