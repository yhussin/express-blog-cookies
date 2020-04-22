const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// GET Register New
router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Register',
  });
});

// POST Register Create (User)
router.post('/register', async (req, res) => {
  // Validating
  console.log('New User Obj = ', req.body);
  try {
    // Create A New User
    // Redirect To The Login page
    const user = await db.User.findOne({username: req.body.username});

    // Check If We Got A User Object Back From The Database
    if (user) {
      return res.send('<h1>Account already exists, please login</h1>');
    }

    // TODO: Hash Password

    const userData = {
      username: req.body.username,
      email: req.body.email,
    }

    // Creating the new user
    await db.User.create(userData);

    // Redirect to the login page
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err);
  }
});

// GET Login New
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

// POST Login Create (Session)
router.post('/login', async (req, res) => {
  // Check for Existing User Account

  // Verify foundUser and password sent from the login form match

  // If passwords don't match respond with vague error.

  // If Passwords do match, create new session and redirect to Authors page


  
});

module.exports = router;
