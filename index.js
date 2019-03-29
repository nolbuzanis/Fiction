const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user'); // Load in user schema and users model
require('./services/passport'); // Load passport config

const app = express();
const PORT = process.env.PORT || 5000;

// Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Passport
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(PORT, () => console.log('Now listening on Port: ' + PORT));
