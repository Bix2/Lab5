const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

/* Make route */
router.get('/', (req, res) => {
  Poll.find({}, (err, poll) => {
      res.json();
  });
});

router.post('/createpoll', (req, res) => {
    let poll = new Poll(req.body);
    poll.save()
      .then(item => {
        res.send("Poll saved to database");
      })
      .catch(err => {
        res.status(400).send("Unable to save to database");
      });
  });

module.exports = router;
