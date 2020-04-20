const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Path = '/authors/'

// GET Authors Index
router.get('/', (req, res) => {
  // Get All Authors from DB
  db.Author.find({}, (err, allAuthors) => {
    if (err) {
      return res.send(err);
    }

    res.render('authors/index', {
      authors: allAuthors,
      title: 'Authors'
    });
  });
});


module.exports = router;
