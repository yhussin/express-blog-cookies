const express = require('express');
const router = express.Router();

// Database
const db = require('../models');


// GET Articles Index
router.get('/', (req, res) => {
  db.Article.find({}, (err, allArticles) => {
    if (err) {
      return res.send(err);
    }

    res.render('articles/index', {
      articles: allArticles,
      title: 'Articles'
    });
  });
});

// GET Articles New
router.get('/new', (req, res) => {
  res.render('articles/new', {
    title: 'New Article'
  });
});

// POST Articles Create
router.post('/', (req, res) => {
  console.log(req.body);
  db.Article.create(req.body, (err, newArticle) => {
    if (err) {
      return res.send(err);
    }

    res.redirect('/articles');
  });
});

// GET Articles Show
router.get('/:id', (req, res) => {
  db.Article.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      return res.send(err);
    }

    res.render('articles/show', {
      article: foundArticle,
      title: 'Article Details'
    });
  });
});

// GET Articles Edit
router.get('/:id/edit', (req, res) => {
  db.Article.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      return res.send(err);
    }

    res.render('articles/edit', {
      article: foundArticle,
      title: 'Edit Article'
    });
  });
});

// PUT Articles Update
router.put('/:id/', (req, res) => {
  db.Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, UpdatedArticle) => {
    if (err) {
      return res.send(err);
    }

    res.redirect(`/articles/${req.params.id}`);
  });
});

// DELETE Articles Destroy
router.delete('/:id', (req, res) => {
  db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) {
      return res.send(err);
    }

    res.redirect('/articles');
  });
});


module.exports = router;
