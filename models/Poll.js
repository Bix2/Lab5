const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pollSchema = new Schema({
    question: String,
    choice1: String,
    choice2: String,
    votes: {
      type: Number,
      default: 0
    }
});

pollSchema.method('vote', function voting(vote, cb) {
  this.votes += 1;
  this.parent().save(cb);
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;