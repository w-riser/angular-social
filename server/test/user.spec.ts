import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import {serverExpress} from '../app';
import User from '../datasets/users';

const should = chai.use(chaiHttp).should();

describe('Users', () => {

  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for users', () => {
// TODo make test
    it('should get all the users', done => {
      chai.request(serverExpress)
        .get('/api/users/get')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get users count', done => {
      chai.request(serverExpress)
        .get('/api/users/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new user', done => {
      const user = {username: 'Dave', email: 'dave@example.com', role: 'user'};
      chai.request(serverExpress)
        .post('/api/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('username');
          res.body.should.have.a.property('email');
          res.body.should.have.a.property('role');
          done();
        });
    });

    it('should get a user by its id', done => {
      const user = new User({username: 'User', email: 'user@example.com', role: 'user'});
      user.save((error, newUser) => {
        chai.request(serverExpress)
          .get(`/api/user/${newUser.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('role');
            res.body.should.have.property('_id').eql(newUser.id);
            done();
          });
      });
    });

    it('should update a user by its id', done => {
      const user = new User({username: 'User', email: 'user@example.com', role: 'user'});
      user.save((error, newUser) => {
        chai.request(serverExpress)
          .put(`/api/user/${newUser.id}`)
          .send({username: 'User 2'})
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a user by its id', done => {
      const user = new User({username: 'User', email: 'user@example.com', role: 'user'});
      user.save((error, newUser) => {
        chai.request(serverExpress)
          .delete(`/api/user/${newUser.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
