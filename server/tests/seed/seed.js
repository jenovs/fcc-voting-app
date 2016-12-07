const {ObjectID} = require('mongodb');
const {Poll} = require('./../../models/poll');

const pollOneId = new ObjectID();
const pollTwoId = new ObjectID();

const polls = [{
  _id: pollOneId,
  name: 'Poll One',
  votes: [{
    pick: 'One',
    count: 3
  }, {
    pick: 'Two',
    count: 4
  }]
}, {
  _id: pollTwoId,
  name: 'Poll Two',
  votes: [{
    pick: 'For'
  }, {
    pick: 'Against'
  }]
}]

const populatePolls = (done) => {
  Poll.remove({}).then(() => {
    const pollOne = new Poll(polls[0]).save();
    const pollTwo = new Poll(polls[1]).save();

    return Promise.all([pollOne, pollTwo]);
  }).then(() => done());
}

module.exports = {polls, populatePolls}
