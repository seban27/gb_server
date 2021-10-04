const authModel = require('../models/auth_model');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
  let user = await authModel.findOne({ id: jwt_payload.id });
  if (user) {
    next(null, user.user);
  } else {
    next(null, false);
  }
});

module.exports = strategy;
