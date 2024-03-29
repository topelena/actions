let mongoose = require('mongoose');
let Event = require('../models/Events');

// Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test for /GET
  */
describe('/GET events', () => {
  it('it should GET four events', (done) => {
    chai.request(server)
      .get('/actions/events')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('array');       
        done();
      });
  });
});
/*
  * Test for /Post
  */
describe('/POST event', () => {
  it('it should POST an event', (done) => {
    let event = {
      user: '5dee65d5760bd461d15b389e',
      title: 'test222',
      details: 'test222',
      address: 'test222',
      lat: 361,
      lng: 68,
      start: 'December 09, 2019 12:01:00',
      end: 'December 10, 2019 10:46:00',
    };
    chai.request(server)
      .post('/actions/events')
      .send(event)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });


});


describe('/POST event', () => {
  it('it should not  save  the same event', (done) => {
    let event = {
      user: '5dee65d5760bd461d15b389e',
      title: 'test222',
      details: 'test222',
      address: 'test222',
      lat: 361,
      lng: 68,
      start: 'December 09, 2019 12:01:00',
      end: 'December 10, 2019 10:46:00',
    };
    chai.request(server)
      .post('/actions/events')
      .send(event)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });


});

describe('/POST event', () => {
  it('should not create an event if start or date is empty or invalid date strind value ', (done) => {
    let event = {
      user: '5dee65d5760bd461d15b389e',
      title: 'test222',
      details: 'test222',
      address: 'test222',
      lat: 361,
      lng: 68,
      start: '',
      date: ':9',
    };
    chai.request(server)
      .post('/actions/events')
      .send(event)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

});
