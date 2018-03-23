const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
    answer: {
      type: String,
      unique: true
    },
    votes: {
      type: Number,
      default: 0
    }
});

answerSchema.method('vote', function voting(vote, cb) {
    this.votes += 1;
    this.parent().save(cb);
});

var pollSchema = new Schema({
    question: {
      type: String,
      unique: true
    },
    answers: [answerSchema]
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;