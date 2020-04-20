const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 4000;
const app = express();

// Controllers
const authorsController = require('./controllers/authorsController');

// Set View Engine
app.set('view engine', 'ejs');

// ------------------------ MIDDLEWARE

// BodyParser
// URL Encoded = ?name=John&age=23
app.use(bodyParser.urlencoded({extended: false}));
// JSON Data = {"name": "John", "age": 23}
app.use(bodyParser.json());


// ------------------------- ROUTES

// GET Root Route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  });
});

// Authors Routes
app.use('/authors', authorsController);


// ---------------------- SERVER LISTENER

app.listen(port, () => console.log(`Server is running on port ${port}`));
