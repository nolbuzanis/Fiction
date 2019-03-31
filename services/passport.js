const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const googleClientID = require('../config/keys').googleClientID;
const googleClientSecret = require('../config/keys').googleClientSecret;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (!existingUser) {
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
