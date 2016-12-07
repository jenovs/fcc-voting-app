const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Poll} = require('./../models/poll');
const {polls, populatePolls} = require('./seed/seed');

beforeEach(populatePolls);

describe('GET /polls', () => {

  it('should get all polls', (done) => {
    request(app)
      .get('/v1/polls')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
        expect(res.body[0].name).toBe('Poll One');
        expect(res.body[0].votes[0].count).toBe(3);
        expect(res.body[1].votes[1].count).toBe(0);
        expect(res.body[1].votes[2]).toNotExist();
      })
      .end(done);
  });

  it('should get one poll by id', (done) => {
    const id = polls[0]._id;

    request(app)
      .get(`/v1/polls/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(1);
      })
      .end(done);
  });

  it('should return 404 if no poll with such id', (done) =>{
    const id = new ObjectID();

    request(app)
      .get(`/v1/polls/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if invalid id', (done) =>{
    const id = '123456abc';

    request(app)
      .get(`/v1/polls/${id}`)
      .expect(400)
      .end(done);
  });
});
