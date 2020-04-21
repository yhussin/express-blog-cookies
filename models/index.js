const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/express-blog';
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(connectionString, configOptions)
  .then(() => console.log('MongoDB connected successfully...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
  Author: require('./Author'),
  Article: require('./Article'),
};
