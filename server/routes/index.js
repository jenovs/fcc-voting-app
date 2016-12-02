const router = require('express').Router();
const {Poll} = require('./../models/poll');

// Get list of all polls
router.get('/polls', (req, res) => {
  res.send();
});

// Get specific poll by id
router.get('/polls/:id', (req, res) => {
  res.send();
});

// Create a new poll
router.post('/polls', (req, res) => {
  res.send();
});

// Update a poll by id
router.patch('/polls/:id', (req, res) => {
  res.send();
});

// Delete poll by id
router.delete('/polls/:id', (req, res) => {
  res.send();
});

module.exports = router;
