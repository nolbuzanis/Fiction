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
    passport.authenticate('google', { failureRedirect: '/' }),
    () => {
      console.log('Sucessfully logged in!');
    },
    (res, req) => {
      res.redirect('/');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
  });

  app.get('/api/current_user', (req, res) => {
    console.log(req.user);
  });
};
