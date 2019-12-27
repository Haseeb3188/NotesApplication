let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);



// Schema defines how the user data will be stored in MongoDB
let NoteSchema = new Schema({
  noteId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  group: {
    type: String
  },
  favourite: {
    type: Boolean
  },
  createdOn: {
    type: Date
  },
  modifiedOn: {
    type: Date
  }
});


NoteSchema.pre('save', function(next) {
var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        console.log("...count: "+JSON.stringify(count));
        doc.noteId = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

// Export the Model
module.exports = mongoose.model('note', NoteSchema);
