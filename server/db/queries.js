const {mongoose} = require('./mongoose');
const {Poll} = require('./../models/poll');

module.exports = {

  getAllPolls: (req, res) => {
    Poll.find().select('-_id name votes.pick votes.count')
      .then(poll => {
        res.status(200).send({poll});
      })
      .catch(e => res.status(400).send());
  },

  getOnePoll: (req, res) => {
    res.send();
  },

  createNewPoll: (req, res) => {
    if (!req.body.name || !req.body.picks || req.body.picks.length < 2) {
      return res.status(400).send();
    }

    const name = req.body.name;
    let votes = [];

    try {
      req.body.picks.forEach(pick => {
        votes.push({pick})
      })
    } catch (e) {
      res.status(400).send();
    }
    const poll = new Poll({name, votes});
    poll.save().then(doc => {
      res.status(200).send(doc);
    })
    .catch(e => res.status(400).send());
  },

  updateOnePoll: (req, res) => {
    res.send();
  },

  deleteOnePoll: (req, res) => {
    res.send();
  }

}
