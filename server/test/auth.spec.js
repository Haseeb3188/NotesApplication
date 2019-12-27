// const expect = require('chai').expect;
// const { signJWTToken, verifyJWTToken } = require('../modules');

// describe('JWT Token test scenarios', function() {
// 	before(function(done) { done(); });
// 	after(function(done) { done(); });

// 	it('Assert signing & verification methods exists and are valid', function() {
// 		expect(signJWTToken).to.not.equal(undefined);
// 		expect(signJWTToken).to.not.equal(null);
// 		expect(typeof(signJWTToken)).to.equal('function');
// 		expect(signJWTToken.length).to.be.above(0, 'this method must have arguments');

// 		expect(verifyJWTToken).to.not.equal(undefined);
// 		expect(verifyJWTToken).to.not.equal(null);
// 		expect(typeof(verifyJWTToken)).to.equal('function');
// 		expect(verifyJWTToken.length).to.be.above(0, 'this method must have arguments');

// 		expect(signJWTToken).to.be.an('function');
// 	});

// 	it('sign a token with valid payload, signature, secret and expiry time', function(done) { 
// 		done() 
// 	});
// 	it('verification of a valid signed token, must return same payload, which was passed', function(done) {
// 	 done() 
// 	});
// 	it('verification a expired token, must return with appropriate error', function(done) {
// 		done() 
// 	});
// 	it('verification a invalid, must return with appropriate error', function(done) {
// 	 done() 
// 	});

// });
const expect = require('chai').expect;
const { signJWTToken, verifyJWTToken } = require('../modules');
const config = require('./test.config');
let jwtToken;
const secret = config.secret;
const payload = config.payload;
const expireIn = config.expireIn;
const expireInSecond = config.expireInSecond;

describe('JWT Token test scenarios', function() {

  it('Assert signing & verification methods exists and are valid', function() {
    expect(signJWTToken).to.not.equal(undefined);
    expect(signJWTToken).to.not.equal(null);
    expect(typeof(signJWTToken)).to.equal('function');
    expect(signJWTToken.length).to.be.above(0, 'this method must have arguments');

    expect(verifyJWTToken).to.not.equal(undefined);
    expect(verifyJWTToken).to.not.equal(null);
    expect(typeof(verifyJWTToken)).to.equal('function');
    expect(verifyJWTToken.length).to.be.above(0, 'this method must have arguments');

    expect(signJWTToken).to.be.an('function');
  });

  it('sign a token with valid payload, signature, secret and expiry time', function(done) {
    signJWTToken(payload, secret, expireIn, (err, token) => {
      if(err) {
        done(err);
      } else {
        jwtToken = token;
        expect(token.length).to.be.above(0, 'Should return a token');
        expect(token).to.not.equal(null, 'Token should not be null');
        expect(token).to.not.equal(undefined, 'Token should not be undefined');
        done();
      }
    });
  });
  
  it('verification of a valid signed token, must return same payload, which was passed', function(done) {
    verifyJWTToken(jwtToken, secret, (err, decoded) => {      
      if(err) {
        done(err);
      } else {
        expect(payload.username).to.be.equal(decoded.username, 'Should return same payload which was given at the creation time');
        done();
      }
    }); 
  });

  it('verification a expired token, must return with appropriate error', function(done) {
    signJWTToken(payload, secret, expireInSecond, (err, token) => {
      if(err) {
        done(err);
      } else {
        const expiredToken = token;
        verifyJWTToken(expiredToken, secret, (err, decoded) => {
          if(err) {
            //expect(decoded).to.be.equal(undefined, 'Should return payload as undefined if expired token passed');
            expect(err).to.be.equal('jwt expired', 'Should return err.message from verifyJWTToken method');
            done();
          } else {
            expect(decoded).to.be.equal(undefined, 'Should return payload as undefined if expired token passed');
            done();
          }
        });
      }
    });
  });

  it('verification a invalid, must return with appropriate error', function(done) {
    const invalidToken = 'life' + jwtToken.substring(4, jwtToken.length);
    verifyJWTToken(invalidToken, secret, (err, decoded) => {
      if(err) {
        //expect(decoded).to.be.equal(undefined, 'Should return payload as undefined if invalid token passed');
        expect(err).to.be.equal('invalid token', 'Should return err.message from verifyJWTToken method');
        done();
      } else {
        expect(decoded).to.be.equal(undefined, 'Should return payload as undefined if invalid token passed');
        done();
      }
    }); 
  });
});