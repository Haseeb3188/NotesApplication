// const should = require('chai').should();
// const request = require('supertest');
// const app = require('../app');
// const config = require('./test.config');

// const USER_ID_1 = ''; // userID should be same which is used to generate the token 
// const USER_ID_2 = ''; // userID should be same which is used to generate the token

// //  testsuite
// describe('Testing to add a note', function()
// {
//   //  testcase
//   it('Should handle a request to add a new note for user 1 ', function(done)
//   {
//     // Should get added note of user 1 as a respone,  need to match added note text value
//     // status = 201
//     // response will be added note object
//     // Pass valid token in Authorization header as Bearer
//     done();
//   });

//   //  testcase
//   it('Should handle a request to add a new note for user 2', function(done)
//   {
//     // Should get added note of user 2 as a respone,  need to match added note text value
//     // status = 201
//     // response will be added note object
//     // Pass valid token in Authorization header as Bearer
//     done();
//   });
// });

// //  testsuite
// describe('Testing to get all notes', function()
// {
//   //  testcase
//   it('Should handle a request to get all notes of a user 1', function(done)
//   {
//     // Should get all note as a array those are created by user 1 and Should match recently added note text value
//     // status = 200
//     // response will be a array or all notes those are added by user 1
//     // Pass valid token in Authorization header as Bearer
//     done();
//   });

//   //  testcase
//   it('Should handle a request to get all notes of a user 2', function(done)
//   {
//     // Should get all note as a array those are created by user 2 and Should match recently added note text value
//     // status = 200
//     // response will be a array or all notes those are added by user 2
//     // Pass valid token in Authorization header as Bearer
//     done();

//   });

//   //  testcase
//   it('Should handle a request to get notes of a user who has not created any note', function(done)
//   {
//     // should get blank array
//     // status = 200
//     // response will be an empty array
//     // Pass valid token in Authorization header as Bearer
//     done();
//   });
// });

// //  testsuite
// describe('Testing to update a note', function()
// {
//   //  testcase
//   it('Should handle a request to update a note by note id', function(done)
//   {
//     // Should return updated note and match updated note text value'
//     // status = 200
//     // response will hold updated note as an object
//     // Pass valid token in Authorization header as Bearer
//     done();
//   });
// });

// describe('Negative test scenarios', function() {
//     it('Make a API request to a resource with invalid token, which requires authentication, should return forbidden status and error ', function(done) { 
//       done(); 
//     });
//     it('Make a API request to a resource without any token, which requires authentication, should return forbidden status and error ', function(done) {
//       done();
//     });
// });
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const { noteModel }= require('../modules');
// getting config data 

describe('test scenarios for not found', function() {

  // it('Make a API request to a resource without any token, which requires authentication, should return forbidden status and error ', function(done) {
  //   request(app)
  //   .get('/api/v1/notes')
  //   .expect(403)
  //   .end(function(err, res)
  //   {
  //     if(err) {
  //       done(err);
  //     } else {
  //       expect(res.text).to.be.equal('Not authenticated', 'Should show err.message in response on invalid token');
  //       done();
  //     }
  //   });
  // });

   it('wrong URL, should return not found status and error ', function(done) {
    request(app)
    .get('/api/v1/notes1/')
    .expect(200)
    .end(function(err, res)
    {
      if(err) {
        done(err);
      } else {
        expect(res.body.status).to.be.equal(404, 'Should show Not Found');
        done();
      }
    });
  });
});
