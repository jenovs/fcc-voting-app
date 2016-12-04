const router = require('express').Router();
const db = require('./../db/queries');

// Get list of all polls
router.get('/polls', db.getAllPolls)

// Get specific poll by id
router.get('/polls/:id', db.getOnePoll);

// Create a new poll
router.post('/polls', db.createNewPoll);

// Update a poll by id
router.patch('/polls/:id/:vote', db.votePoll);

// Delete poll by id
router.delete('/polls/:id', db.deleteOnePoll);

module.exports = router;
