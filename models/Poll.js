const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: String,
  updated_at: Date,
  choice1: {
    text: String,
    votes: {
      type: Number,
      default: 0
    }
  },
  choice2: {
    text: String,
    votes: {
      type: Number,
      default: 0
    }
  }
})

/*
pollSchema.method('vote', function voting(vote, cb) {
  this.votes += 1;
  this.parent().save(cb);
});
*/

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;