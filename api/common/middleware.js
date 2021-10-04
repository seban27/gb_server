const passport = require('passport');
const config = require('../../config/config');

let middleware = {
  authenticate,
};

function authenticate(req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (err) {
      const response = {
        error: {},
        message: err.message,
      };
      return res.status(401).send(response);
    }
    if (!user) {
      const response = {
        error: {},
        message: config.messages.authFailure,
      };
      return res.status(401).send(response);
    }
    req.owner = user;
    next();
  })(req, res, next);
}

module.exports = middleware;
