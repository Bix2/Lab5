const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Poll = require('../models/Poll');

/* GET HOME PAGE */
router.get('/', (req, res, next) => {
  res.render('index', {
  });
});

/* GET FORM FOR ADDING NEW POLL */
router.get('/createpoll', (req, res, next) => {
  res.render('createpoll');  
});

router.post('/createpoll', (req, res, next) => {
  res.redirect('/'); 
});

module.exports = router;
