const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const { noteModel }= require('../modules');
// getting config data 
const note_user1 = config.note_user1;
const note_user2 = config.note_user2;
const updateNote =  config.updateNote;
const user1 = config.user1;
const user2 = config.user2;
const user3 = config.user3;
let noteId;
let USER_ID_1;
let USER_ID_2;
let User_ID_3;
let jwtToken1;
let jwtToken2;
let jwtToken3;

const findNote = (query, done) => {
  noteModel.findOne(query, (err, note)=> {
    if(err) {
      done(err);
    } else {
      done(null, note);
    }
  });
}

const getNotes = (query, done) => {
  noteModel.find(query, (err, notes)=> {
    if(err) {
      done(err);
    } else {
      done(null, notes);
    }
  });
}

// used to generate token
function loginUser()
{
  return function(done)
  {
    this.timeout(4000);
    request(app)
    .post('/api/v1/users/register')
    .send(user1)
    .end(function(err, res) {
      request(app)
      .post('/api/v1/users/register')
      .send(user2)
      .end(function(err, res) {
        should.not.exist(err);
        request(app)
        .post('/api/v1/users/register')
        .send(user3)
        .end(function(err, res) {
          request(app)
          .post('/api/v1/users/login')
          .expect(200)
          .send(user1)
          .end((err, res) => {
            should.not.exist(err);
            USER_ID_1 = res.body.user.userId
            jwtToken1  = res.body.token;
            request(app)
            .post('/api/v1/users/login')
            .expect(200)
            .send(user2)
            .end((err, res) => {
              USER_ID_2 = res.body.user.userId
              should.not.exist(err);
              jwtToken2  = res.body.token;
              request(app)
              .post('/api/v1/users/login')
              .expect(200)
              .send(user3)
              .end((err, res) => {
                USER_ID_3 = res.body.user.userId
                should.not.exist(err);
                jwtToken3  = res.body.token;
                done();
              });
            });
          });
        });
      });
    });
  };
}

// Will be called only once, before executing any testsuit.
before(loginUser());



//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    this.timeout(3000);
    request(app)
    .post('/api/v1/notes?userId='+USER_ID_1)
    .set('Authorization', 'Bearer ' + jwtToken1)
    .expect(201)
    .expect('Content-Type', /json/)
    .send(note_user1)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return inserted note');      
      res.body.text.should.be.equal('This is angular note', 'Should match added note text value');
      noteId = res.body.note.noteId;
      findNote({userId: USER_ID_1, noteId: noteId}, (error, note)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(note, 'Returning null as a response, should return inserted note');
          note.text.should.be.equal('This is angular note');
          done();
        }
      });
    });
  });

  // //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    this.timeout(3000);
    request(app)
    .post('/api/v1/notes?userId='+USER_ID_2)
    .set('Authorization', 'Bearer ' + jwtToken2)
    .expect(201)
    .expect('Content-Type', /json/)
    .send(note_user2)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return inserted note');
      res.body.text.should.be.equal('This is react note', 'Should match added note text value');
      findNote({userId: USER_ID_2, noteId: res.body.note.noteId}, (error, note)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(note, 'Returning null as a response, should return inserted note');
          note.text.should.be.equal('This is react note');
          done();
        }
      });
    });
  });
});

//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    request(app)
    .get('/api/v1/notes?userId='+USER_ID_1)
    .set('Authorization', 'Bearer ' + jwtToken1)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return all inserted notes of user 1');
      res.body[res.body.length-1].text.should.be.equal('This is angular note', 'Should match last note text value ');
      getNotes({userId: USER_ID_1}, (error, notes)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(notes, 'Returning null as a response, should return all notes of user 1');
          notes[notes.length-1].text.should.be.equal('This is angular note');
          done();
        }
      });
    });
  });

  //  testcase
  // it('Should handle a request to get all notes of a user 2', function(done)
  // {
  //   request(app)
  //   .get('/api/v1/notes?userId='+USER_ID_2)
  //   .set('Authorization', 'Bearer ' + jwtToken2)
  //   .expect(200)
  //   .expect('Content-Type', /json/)
  //   .end(function(err, res) {
  //     should.not.exist(err);
  //     should.exist(res.body, 'Should return all inserted notes of user 2');
  //     res.body[res.body.length-1].text.should.be.equal('This is react note', 'Should match last note text value ');
  //     getNotes({userId: USER_ID_2}, (error, notes)=> {
  //       if(err) {
  //         should.not.exist(error);
  //         done();
  //       } else {
  //         should.exist(notes, 'Returning null as a response, should return all notes of user 2');
  //         notes[notes.length-1].text.should.be.equal('This is react note');
  //         done();
  //       }
  //     });
  //   });
  // });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    request(app)
    .get('/api/v1/notes?userId='+USER_ID_3)
    .set('Authorization', 'Bearer ' + jwtToken3)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return blank array of a user who has not created any note');
      res.body.length.should.be.equal(0, 'Should get blank array');
      getNotes({userId: 'hellodelhihowareyou'}, (error, notes)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(notes, 'Should return blank array of a user who has not created any note');
          res.body.length.should.be.equal(0, 'Should get blank array');
          done();
        }
      });
    });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    request(app)
    .put('/api/v1/notes/' + noteId)
    .set('Authorization', 'Bearer ' + jwtToken1)
    .expect('Content-Type', /json/)
    .send(updateNote)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Returning null as a response, should return updated note');
      console.log('res.body',res.body);
      res.body.text.should.be.equal('This is angular 6 note', 'Should match updated note text');
      done();
    });
  });
});

describe('Negative test scenarios', function() {
  it('Make a API request to a resource with invalid token, which requires authentication, should return forbidden status and error ', function(done) {
    const invalidToken = 'life' + jwtToken1.substring(4, jwtToken1.length);
    request(app)
    .get('/api/v1/notes?userId='+USER_ID_1)
    .set('Authorization', 'Bearer ' + invalidToken)
    .expect(403)
    .end(function(err, res)
    {
      if(err) {
        done(err);
      } else {
        expect(res.text).to.be.equal('invalid token', 'Should show err.message in response on invalid token');
        done();
      }
    });
  });

  // it('Make a API request to a resource without any token, which requires authentication, should return forbidden status and error ', function(done) {
  //   request(app)
  //   .get('/api/v1/notes?userId=' + USER_ID_3)
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
