const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var choiceSchema = new Schema({
  text: String,
  votes: {
    type: Number,
    default: 0
  }
});

var pollSchema = new Schema({
    question: String,
    choices: [choiceSchema]
});

/*
pollSchema.method('vote', function voting(vote, cb) {
  this.votes += 1;
  this.parent().save(cb);
});*/

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;