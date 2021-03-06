const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      sucessRedirect: '/',
      failureRedirect: '/auth/google'
    })
  );

  app.get('/api/logout', (req, res) => {
    req.session = null;
  });

  app.get('/api/current_user', (req, res) => {
    console.log(req.user);
  });
};
