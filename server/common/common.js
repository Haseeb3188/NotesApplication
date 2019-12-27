let bcrypt = require('bcryptjs');

// handler to compare password
const comparePassword = (givenPW, savedPW, cb) => {
  bcrypt.compare(givenPW, savedPW, function(err, isMatch) {
    if(err) {
      cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = {
  comparePassword
}