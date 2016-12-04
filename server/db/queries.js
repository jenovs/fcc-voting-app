const {mongoose} = require('./mongoose');
const {Poll} = require('./../models/poll');

module.exports = {

  getAllPolls: (req, res) => {
    Poll.find().select('name votes.pick votes.count votes._id')
      .then(poll => {
        res.status(200).send(poll);
      })
      .catch(e => res.status(400).send());
  },

  getOnePoll: (req, res) => {
    Poll.find({_id: req.params.id}).then(poll => {
      if (!poll.length) return res.status(400).send();
      res.status(200).send(poll[0]);
    }).catch(e => res.status(400).send());
  },

  // Input: name: "Name of the poll", picks: ["Pick1", "Pick2", ...]
  createNewPoll: (req, res) => {
    if (!req.body.name || !req.body.picks || req.body.picks.length < 2) {
      return res.status(400).send();
    }
    let votes = [];
    try {
      req.body.picks.forEach(pick => {
        votes.push({pick})
      })
    } catch (e) {
      res.status(400).send();
    }
    const poll = new Poll({
      name: req.body.name,
      votes
    });
    poll.save().then(doc => {
      res.status(200).send(doc);
    })
    .catch(e => res.status(400).send());
  },

  votePoll: (req, res) => {
    // the positional $ operator acts as a placeholder
    // for the first element that matches the query document
    Poll.findOneAndUpdate({
      _id: req.params.id,
      'votes._id': req.params.vote
    }, {$inc: {'votes.$.count': 1}}, {new: true})
    .then(doc => {
      // if no records updated
      if (!doc) return res.status(400).send();

      res.status(200).send(doc);
    })
    .catch(e => res.status(400).send());
  },

  deleteOnePoll: (req, res) => {
    Poll.findOneAndRemove({_id: req.params.id})
    .then(poll => {
      // if no records deleted
      if (!poll) return res.status(404).send();
      res.status(204).send();
    })
    .catch(e => res.send(400).send())
  }

}
