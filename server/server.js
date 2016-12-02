const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse data in POST and PATCH request bodies and add to req.body
app.use(bodyParser.json());

app.disable('x-powered-by');

app.get('/', (req, res) => {
});

// Get list of all polls
app.get('/polls', (req, res) => {
  res.send();
});

// Get specific poll by id
app.get('/polls/:id', (req, res) => {
  res.send();
});

// Create a new poll
app.post('/polls', (req, res) => {
  res.send();
});

// Update a poll by id
app.patch('/polls/:id', (req, res) => {
  res.send();
});

// Delete poll by id
app.delete('/polls/:id', (req, res) => {
  res.send();
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
