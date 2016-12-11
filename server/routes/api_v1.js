'use strict';

const router = require('express').Router();
const passport = require('passport');

const db = require('./../db/queries');
const User = require('./../models/user');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({error: 'Unauthorized'});
  }
}

// Get list of all polls
router.get('/polls', db.getAllPolls)

// Get specific poll by id
router.get('/polls/:id', db.getOnePoll);

// Create a new poll
router.post('/polls', ensureAuthenticated, db.createNewPoll);

// Update a poll by id
router.patch('/polls/:id/:vote', db.votePoll);

// Add vote options to the poll
router.patch('/polls/:id', ensureAuthenticated, db.addPicks);

// Delete poll by id
router.delete('/polls/:id', ensureAuthenticated, db.deleteOnePoll);

module.exports = router;
