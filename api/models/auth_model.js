const { db } = require('../common/sequalize');
const { User } = db;
const config = require('../../config/config');

let authModel = {
  findOne,
  findByEmail,
  checkEmailExist,
  createUser,
};

function findOne(param) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { ...param },
    })
      .then(function (data) {
        param.user = data;
        resolve(param);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function findByEmail(param) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { email: param.email },
    })
      .then(function (data) {
        if (data) {
          param.user = data;
          resolve(param);
        } else {
          reject(new Error(config.messages.loginError));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function checkEmailExist(param) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { email: param.email },
    })
      .then(function (data) {
        if (data) {
          reject(new Error(config.messages.emailAlreadyExists));
        } else {
          resolve(param);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createUser(param) {
  return new Promise((resolve, reject) => {
    User.create({
      first_name: param.firstName,
      last_name: param.lastName,
      email: param.email,
      password: param.password,
    })
      .then(function (data) {
        param.user = data;
        resolve(param);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = authModel;
