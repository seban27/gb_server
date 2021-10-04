const authModel = require('../models/auth_model');
const config = require('../../config/config');
const logger = require('../common/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let authController = {
  emailLogin,
  signup,
};

function emailLogin(req, res, next) {
  let params = req.body;
  if (params.email && params.password) {
    authModel
      .findByEmail(params)
      .then((result) => {
        if (
          result.user &&
          bcrypt.compareSync(result.password, result.user.password)
        ) {
          let payload = { id: result.user.id };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: config.auth.jwtExpiration,
          });
          const response = {
            data: {
              token,
              expiry: config.auth.jwtExpiration,
              user: result.user,
            },
            message: config.messages.success,
          };
          res.send(response);
        } else {
          throw new Error(config.messages.loginError);
        }
      })
      .catch((error) => {
        const response = { error: {}, message: error.message };
        res.send(response);
        logger.error(error);
      });
  } else {
    const response = {
      error: {},
      message: config.messages.fieldMissing,
    };
    res.send(response);
  }
}

function signup(req, res, next) {
  let params = req.body;
  if (params.email && params.firstName && params.lastName && params.password) {
    authModel
      .checkEmailExist(params)
      .then(authModel.createUser)
      .then((result) => {
        const response = {
          data: { user: result.user },
          message: config.messages.signupSuccess,
        };
        res.send(response);
      })
      .catch((error) => {
        const response = { error: {}, message: error.message };
        res.send(response);
        logger.error(error);
      });
  } else {
    const response = {
      error: {},
      message: config.messages.fieldMissing,
    };
    res.send(response);
  }
}

module.exports = authController;
