let mongoose = require('mongoose');
let User = require('../models/Users');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test for /GET
  */
describe('/GET users', () => {
  it('it should GET four users', (done) => {
    chai.request(server)
      .get('/actions/users')
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
describe('Users', () => {
  beforeEach((done) => { // Delete user before any test
    let user = {
      name: 'Olena',
      email: 'test16@test.com',
    };
    User.remove(user, (err) => {
      done();
    });
  });

  describe('/POST user', () => {
    it('it should POST a user', (done) => {
      let user = {
        name: 'Olena',
        email: 'test16@test.com',
      };
      chai.request(server)
        .post('/actions/users')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });


  });
});

describe('/POST user', () => {
  it('it should not  save  the same user', (done) => {
    let user = {
      name: 'Olena',
      email: 'test16@test.com',
    };
    chai.request(server)
      .post('/actions/users')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        done();
      });
  });


});

describe('/POST user', () => {
  it('should not create a user if name or email is empty or value is not email', (done) => {
    let user = {
      name: '',
      email: 'olenatest.com',
    };
    chai.request(server)
      .post('/actions/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

});

describe('/POST user', () => {
  it('should not create a user if name or email is empty or  value is not email', (done) => {
    let user = {};
    chai.request(server)
      .post('/actions/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

});


