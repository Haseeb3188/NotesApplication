let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

// Schema defines how the user data will be stored in MongoDB
let UserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
  let user = this;
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if(err) {
        next(err);
      }
      bcrypt.hash(user.password, salt, function(error, hash) {
        if(error) {
          next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


// Export the Model
module.exports = mongoose.model('user', UserSchema);
