const express = require('express');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Passport
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(PORT, () => console.log('Now listening on Port: ' + PORT));
