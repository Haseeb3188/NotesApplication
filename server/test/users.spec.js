// const should = require('chai').should();
// const request = require('supertest');
// const app = require('../app');
// const config = require('./test.config');

// //  testsuite
// describe('Testing to register a user', function()
// {
//   //  testcase
//   it('Should handle a request to register a user', function(done)
//   {
//     // Response body should have a key as userInfo which will hold 'username' value
//     // status code = 201
//     // response body will hold user.userName
//     done();
//   });

//   //  testcase
//   it('Should handle a request to register a user multiple times with same username', function(done)
//   {
//     //Response body should have a key as message which will hold value as 'username is already exist'
//     // status code = 403
//     // response body will hold an object with message key
//     done()
//   });
// });

// //  testsuite
// describe('Testing to login user', function()
// {
//   //  testcase
//   it('Should handle a request to successfully login', function(done)
//   {
//     //Response body should have a key as user which will hold userName as a key and it will hold username value
//     // status code = 200
//     // response body will hold user.userName
//     done();
//   });

//   //  testcase
//   it('Should handle a request to login with wrong password', function(done)
//   {
//   //Response body should have a key as message which will hold value as 'Password is incorrect'
//   // status code = 403
//   // response body will hold an object with message key
//     done();
//   });

//   //  testcase
//   it('Should handle a request to login with wrong username', function(done)
//   {
//     //Response body should have a key as message which will hold value as 'You are not registered user'
//     // status code = 403
//     // response body will hold an object with message key
//     done();
//   });
// });
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const { userModel }= require('../modules');

// getting config data 
const user = config.user;
const wrongPassword = config.wrongPassword;
const wrongUserName = config.wrongUserName;


const findUser = (query, done) => {
  userModel.findOne(query, (err, user)=> {
    if(err) {
      done(err);
    } else {
      done(null, user);
    }
  });
}

//  testsuite
describe('Testing to register a user', function()
{
  //  testcase
  it('Should handle a request to register a user', function(done)
  {
    this.timeout(3000);
    request(app)
    .post('/api/v1/users/register')
    .expect(201)
    .expect('Content-Type', /json/)
    .send(user)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Response body should not be null or undefined');
      res.body.userInfo.should.be.equal('admin@gmail.com', 'Response body should have a key as userInfo which will hold username value');
      findUser({userName: res.body.userInfo}, (error, user)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(user, 'Returning null as a response, should return registered user');
          user.userName.should.be.equal('admin@gmail.com');
          done();
        }
      });
    });
  });

  //  testcase
  it('Should handle a request to register a user multiple times with same username', function(done)
  {
    request(app)
    .post('/api/v1/users/register')
    .expect('Content-Type', /json/)
    .send(user)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.message.should.be.equal('username is already exist', 'Response body should have a key as message which will hold value as username is already exist');
      done();
    });
  });
});

//  testsuite
describe('Testing to login user', function()
{
  //  testcase
  it('Should handle a request to successfully login', function(done)
  {
    request(app)
    .post('/api/v1/users/login')
    .expect(200)
    .expect('Content-Type', /json/)
    .send(user)
    .end(function(err, res) {
      should.not.exist(err);
      expect(res.body.token.length).to.be.above(0, 'Should return a token');
      expect(res.body.token).to.not.equal(null, 'Token should not be null');
      expect(res.body.token).to.not.equal(undefined, 'Token should not be undefined');
      res.body.user.userName.should.be.equal('admin@gmail.com', 'Response body should have a key as user which will hold userName as a key and it will hold username value');
      done();
    });
  });

  //  testcase
  it('Should handle a request to login with wrong password', function(done)
  {
    request(app)
    .post('/api/v1/users/login')
    .expect('Content-Type', /json/)
    .send(wrongPassword)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.message.should.be.equal('Passwords is incorrect', 'Response body should have a key as message which will hold value as Password is incorrect');
      done();
    });
  });

  //  testcase
  it('Should handle a request to login with wrong username', function(done)
  {
    request(app)
    .post('/api/v1/users/login')
    .expect('Content-Type', /json/)
    .send(wrongUserName)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.message.should.be.equal('You are not registered user', 'Response body should have a key as message which will hold value as You are not registered user');
      done();
    });
  });
});
