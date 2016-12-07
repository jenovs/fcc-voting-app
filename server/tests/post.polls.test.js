const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Poll} = require('./../models/poll');
const {polls, populatePolls} = require('./seed/seed');

beforeEach(populatePolls);

describe('POST /polls', () => {

  it('should create a new poll with three picks', (done) => {
    const poll = {
      name: 'Super poll',
      picks: ['Pick1', 'Pick2', 'Pick3']
    }

    request(app)
      .post(`/v1/polls`)
      .send(poll)
      .expect(201)
      .expect(res => {
        // console.log(res.body);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe(poll.name);
        expect(res.body[0].votes.length).toBe(3);
        expect(res.body[0].votes[0].pick).toBe('Pick1');
        expect(res.body[0].votes[1].count).toBe(0);
      })
      .end(done);
  });

  it('should not create poll if name missing', (done) => {
    const poll = {
      picks: ['Pick1', 'Pick2', 'Pick3']
    }

    request(app)
      .post(`/v1/polls`)
      .send(poll)
      .expect(400)
      .end(done);
  });

  it('should not create poll if picks missing', (done) => {
    const poll = {
      name: 'Super poll'
    }

    request(app)
      .post(`/v1/polls`)
      .send(poll)
      .expect(400)
      .end(done);
  });

  it('should not create poll if name is zero length', (done) => {
    const poll = {
      name: '',
      picks: ['Pick1', 'Pick2', 'Pick3']
    }

    request(app)
      .post(`/v1/polls`)
      .send(poll)
      .expect(400)
      .end(done);
  });

  it('should not create poll if only one pick', (done) => {
    const poll = {
      name: 'Super poll',
      picks: ['Pick1']
    }

    request(app)
      .post(`/v1/polls`)
      .send(poll)
      .expect(400)
      .end(done);
  });

  it('should ignore any additional parameters', (done) => {
    const poll = {
      name: 'Super poll',
      picks: ['Pick1', 'Pick2', 'Pick3'],
      dummy1: {name: 'Fun'},
      dummy2: 'Some text'
    }

    request(app)
      .post(`/v1/polls`)
      .send(poll)
      .expect(201)
      .expect(res => {
        expect(res.body[0].name).toBe(poll.name);
        expect(res.body[0].votes.length).toBe(3);
        expect(res.body[0].dummy1).toNotExist();
        expect(res.body[0].dummy2).toNotExist();
      })
      .end(done);
  });
});
