const employeeModel = require('../models/employee_model');
const config = require('../../config/config');
const logger = require('../common/logger');

let employeeController = {
  insertRecord,
  findAllRecords,
  updateRecord,
  deleteRecord,
};

function insertRecord(req, res, next) {
  let params = req.body;
  params.owner = req.owner;
  if (
    params.employeeId &&
    params.name &&
    params.phoneCode &&
    params.phone &&
    params.email &&
    params.address
  ) {
    employeeModel
      .checkEmployeeIdExist(params)
      .then(employeeModel.insertRecord)
      .then((result) => {
        const response = {
          data: { employee: result.employee },
          message: config.messages.success,
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

function findAllRecords(req, res, next) {
  let params = {};
  params.query = req.query;
  employeeModel
    .findAllRecords(params)
    .then((result) => {
      const response = {
        data: { ...result },
        message: config.messages.success,
      };
      res.send(response);
    })
    .catch((error) => {
      const response = { error: {}, message: error.message };
      res.send(response);
      logger.error(error);
    });
}

function updateRecord(req, res, next) {
  let params = req.body;
  params.id = req.params.id;
  params.owner = req.owner;
  if (params.name || params.phoneCode || params.phone || params.address) {
    employeeModel
      .updateRecord(params)
      .then((result) => {
        const response = {
          data: {},
          message: config.messages.success,
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

function deleteRecord(req, res, next) {
  let params = req.params;
  params.owner = req.owner;
  employeeModel
    .deleteRecord(params)
    .then((result) => {
      const response = {
        data: {},
        message: config.messages.success,
      };
      res.send(response);
    })
    .catch((error) => {
      const response = { error: {}, message: error.message };
      res.send(response);
      logger.error(error);
    });
}

module.exports = employeeController;
