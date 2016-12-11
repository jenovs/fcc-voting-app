const {mongoose} = require('./mongoose');
const Poll = require('./../models/poll');

module.exports = {

  // Output: array of objects
  getAllPolls: (req, res) => {
    Poll.find().select('name votes.pick votes.count votes._id _creator')
      .then(poll => {
        res.status(200).send(poll);
      })
      .catch(e => res.status(400).send());
  },

  // Output: array of one object
  getOnePoll: (req, res) => {
    Poll.find({_id: req.params.id}).then(poll => {
      if (!poll.length) return res.status(404).send();
      res.status(200).send(poll);
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
      res.status(400).send(e);
    }

    const poll = new Poll({
      _creator: req.body._creator,
      name: req.body.name,
      votes
    });

    poll.save().then(doc => {
      res.status(201).send([doc]);
    })
    .catch(e => res.status(400).send(e));
  },

  votePoll: (req, res) => {
    // the positional $ operator acts as a placeholder
    // for the first element that matches the query document
    const ip = req.ip.split(':').reverse()[0];
    let key = req.user ? 'votedUsers' : 'votedIps';
    let value = req.user ? req.user._id : ip;
    let push = {};
    push[key] = value;

    Poll.findOne({_id: req.params.id}).then(doc => {
      if (!req.user && doc.votedIps.indexOf(ip) !== -1) {
        return res.status(200).send({error: 'IP already voted. Log in to vote as a user.'});
      }
      else if (req.user && doc.votedUsers.indexOf(req.user._id) !== -1) {
        return res.status(200).send({error: 'User already voted.'});
      }
      else {

        Poll.findOneAndUpdate({
          _id: req.params.id,
          'votes._id': req.params.vote
        }, {$inc: {'votes.$.count': 1}, $push: push}, {new: true})
        .then(doc => {
          // if no records updated
          if (!doc) return res.status(400).send();

          res.status(200).send(doc);
        })
        .catch(e => res.status(400).send());
      }
    }).catch(e => console.log(e));


  },

  // Input: picks: ["Pick1", "Pick2", ...]
  addPicks: (req, res) => {
    if (!req.body.picks || !req.body.picks[0]) return res.status(400).send();
    const picks = [];
    req.body.picks.forEach(pick => picks.push({pick}))
    Poll.findOneAndUpdate({
      _id: req.params.id
    }, {$push: {'votes': {$each: picks}}}, {new: true})
    .then(doc => {
      if (!doc) return res.status(404).send();
      res.status(200).send(doc);
    })
    .catch(e => res.status(400).send(e));
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
