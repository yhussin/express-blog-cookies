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
      title: 'Authors',
    });
  });
});

// GET Authors New
router.get('/new', (req, res) => {
  res.render('authors/new', {
    title: 'Add New Author',
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

// GET Authors Show
router.get('/:id', (req, res) => {
  // Find Author By ID
  db.Author.findById(req.params.id)
    .populate('articles')
    .exec((err, foundAuthor) => {
      if (err) {
        return res.send(err);
      }

      console.log(foundAuthor);

      res.render('authors/show', {
        title: 'Author Details',
        author: foundAuthor,
      });
    });

  // Find Author By ID
  // db.Author.findById(req.params.id, (err, foundAuthor) => {
  //   if (err) {
  //     return res.send(err);
  //   }

  //   console.log(foundAuthor);

  //   res.render('authors/show', {
  //     author: foundAuthor,
  //     title: 'Author Details',
  //   });
  // });
});

// GET Authors Edit
router.get('/:id/edit', (req, res) => {
  // Find Author By ID
  db.Author.findById(req.params.id, (err, foundAuthor) => {
    if (err) {
      return res.send(err);
    }

    res.render('authors/edit', {
      author: foundAuthor,
      title: `Update ${foundAuthor.name}`,
    });
  });
});

// PUT Authors Update
router.put('/:id', (req, res) => {
  db.Author.findByIdAndUpdate(
     req.params.id,
     req.body,
     {new: true},
     (err, updatedAuthor) => {
       if (err) {
         return res.send(err);
       }

       res.redirect(`/authors/${updatedAuthor._id}`);
     }
  );
});

// DELETE Authors Destroy
router.delete('/:id/', (req, res) => {
  // console.log('Request Params', req.params);
  // console.log('Request Queries', req.query);
  // Find the Author By ID and Remove
  db.Author.findByIdAndDelete(req.params.id, (err, deletedAuthor) => {
    if (err) {
      return res.send(err);
    }

    db.Article.deleteMany({author: req.params.id}, (err, result) => {
      if (err) {
        return res.send(err);
      }

      console.log('Delete Many Result = ', result);

      res.redirect('/authors');
    });
  });
});


module.exports = router;
