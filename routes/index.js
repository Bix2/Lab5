const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Poll = require('../models/Poll');

/* GET HOME PAGE */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Vote' });
});

/* GET FORM FOR ADDING NEW POLL */
router.get('/createpoll', (req, res, next) => {
  res.render('createpoll', { title: 'Create Poll' });
});

module.exports = router;
