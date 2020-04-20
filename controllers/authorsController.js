const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Path = '/authors'

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

// GET Authors New
router.get('/new', (req, res) => {
  res.render('authors/new', {
    title: 'Add New Author'
  });
});

// POST Authors Create
router.post('/', (req, res) => {
  // Validation First
  console.log('Request Body = ', req.body);

  db.Author.create(req.body, (err, newAuthor) => {
    if (err) {
      return res.send(err);
    }

    res.redirect('/authors');
  });
});


module.exports = router;
