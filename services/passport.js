const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientID = require('../config/keys').googleClientID;
const googleClientSecret = require('../config/keys').googleClientSecret;

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
