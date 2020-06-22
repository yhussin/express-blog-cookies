//deals with registering, logging on and off
const express = require('express');
const router = express.Router();

//DATABASE
const db = require('../models');

//GET register new user
router.get('/register', (req, res) => {
    //it is not auth/register because that would double it to auth/auth
    res.render('auth/register', {
        title: 'Register',
    });
});

//POST register (create user)
router.post('/register', async (req, res) => {
    //validating
    try {
        //Create a new user
        //redirect to login page
        const user = await db.User.findOne({username: req.body});
        
        //check if we got a user object back from the db
        if (user) {
            return res.send('<h1>Account already exists, please log in</h1>')
        }
        
        //TODO: Hash password

        const userData = userData = {
            username: req.body.username,
            email: req.body.email,
        }

        const newUser = await db.User.create(req.body);
        
        //Redirect
        res.redirect('/auth/login');
    } catch (err) {
        res.send(err);
    }
});

//POST login create (session)
router.post('/login', async (req, res) => {
    try {
        const user = await db.User.findOne({username: req.body.username});
        if (!user) {
          return res.render('auth/login', {
            title: 'Login',
            error: 'Invalid Credentials',
          });
        }
        // Check passwords
        //TODO: update password verification
        if (req.body.password !== '1234') {
          return res.render('auth/login', {
            title: 'Login',
            error: 'Invalid Credentials',
          });
        }
        // Create Session
        req.session.currentUser = user._id;
        res.redirect('/authors');
      } catch (error) {
        res.send(err);
      }
});

module.exports = router;