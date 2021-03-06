const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user'); // Load in user schema and users model

const app = express();
const PORT = process.env.PORT || 8000;

// Cookies Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //passed in milliseconds
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport'); // Load passport config

// Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.get('/', (req, res) => {
  console.log('Home Route');
  res.send({ hi: 'there' });
});

// Passport
require('./routes/authRoutes')(app);

app.listen(PORT, () => console.log('Now listening on Port: ' + PORT));
