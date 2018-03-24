var express = require('express');
var router = express.Router();
const Poll = require('./../models/Poll');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Poll' });
});

router.post('/createpost', (req, res, next) => {
  let pollData = new Poll(req.body);
  pollData.save()
    .then(item => {
      res.send("Name saved to database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

module.exports = router;
