const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientID = require('./config/keys').googleClientID;
const googleClientSecret = require('./config/keys').googleClientSecret;

const app = express();
const PORT = process.env.PORT || 5000;

// Passport

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token: ', accessToken);
      console.log('refresh token: ', refreshToken);
      console.log('profile: ', profile);
      console.log('done: ', done);
    }
  )
);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  () => {
    console.log('Sucessfully logged in!');
    //res.redirect('/');
  }
);

app.listen(PORT, () => console.log('Now listening on Port: ' + PORT));
