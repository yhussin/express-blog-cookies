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
  // GET ALL AUTHORS FROM AUTHOR COLLECTION
  db.Author.find({}, (err, allAuthors) => {
    if (err) {
      return res.send(err);
    }

    res.render('articles/new', {
      title: 'New Article',
      authors: allAuthors,
    });
  });
});

// POST Articles Create
router.post('/', (req, res) => {
  console.log(req.body);
  // Create the article in the Articles collection
  db.Article.create(req.body, (err, newArticle) => {
    if (err) {
      return res.send(err);
    }

    // Add a reference to the article in the Author's articles
    db.Author.findById(req.body.author, (err, foundAuthor) => {
      if (err) {
        return res.send(err);
      }

      // Associate the Author and Article
      foundAuthor.articles.push(newArticle);

      // Save the modified foundAuthor record
      foundAuthor.save((err, savedAuthor) => {
        if(err) {
          return res.send(err);
        }

        res.redirect(`/articles/${newArticle._id}`);
      });
    });
  });
});

// GET Articles Show
router.get('/:id', (req, res) => {
  db.Article.findById(req.params.id)
    .populate('author')
    .exec((err, foundArticle) => {
      if (err) {
        return res.send(err);
      }

      res.render('articles/show', {
        title: 'Article Details',
        article: foundArticle,
      });
    });
    

  // db.Article.findById(req.params.id, (err, foundArticle) => {
  //   if (err) {
  //     return res.send(err);
  //   }

  //   res.render('articles/show', {
  //     article: foundArticle,
  //     title: 'Article Details'
  //   });
  // });
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

    db.Author.findById(deletedArticle.author, (err, foundAuthor) => {
      if (err) {
        return res.send(err);
      }

      console.log('Author before remove', foundAuthor);
      // The remove method takes the id you want removed from an array
      foundAuthor.articles.remove(req.params.id);
      console.log('Author after remove', foundAuthor);
      foundAuthor.save((err, savedAuthor) => {
        if (err) {
          return res.send(err);
        }

        res.redirect('/articles');
      });
    });
  });
});


module.exports = router;
