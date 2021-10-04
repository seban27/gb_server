const { db } = require('../common/sequalize');
const { Employee } = db;
const config = require('../../config/config');

let employeeModel = {
  insertRecord,
  findAllRecords,
  updateRecord,
  deleteRecord,
  checkEmployeeIdExist,
};

function insertRecord(param) {
  return new Promise((resolve, reject) => {
    Employee.create({
      employee_id: param.employeeId,
      name: param.name,
      email: param.email,
      phone_code: param.phoneCode,
      phone: param.phone,
      address: param.address,
      created_by: param.owner.id,
    })
      .then(function (data) {
        param.employee = data;
        resolve(param);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function findAllRecords(param) {
  let whereCondition = param.query.query
    ? {
        [db.Sequelize.Op.or]: [
          {
            employee_id: {
              [db.Sequelize.Op.like]: '%' + param.query.query + '%',
            },
          },
          {
            name: {
              [db.Sequelize.Op.like]: '%' + param.query.query + '%',
            },
          },
          {
            email: {
              [db.Sequelize.Op.like]: '%' + param.query.query + '%',
            },
          },
          {
            phone: {
              [db.Sequelize.Op.like]: '%' + param.query.query + '%',
            },
          },
          {
            address: {
              [db.Sequelize.Op.like]: '%' + param.query.query + '%',
            },
          },
        ],
      }
    : {};
  return new Promise((resolve, reject) => {
    Employee.findAll({
      where: whereCondition,
    })
      .then(function (data) {
        param.employees = data;
        resolve(param);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateRecord(param) {
  return new Promise((resolve, reject) => {
    Employee.update(
      {
        name: param.name,
        phone_code: param.phone_code,
        phone: param.phone,
        email: param.email,
        address: param.address,
        updated_by: param.owner.id,
      },
      { where: { id: param.id } }
    )
      .then(function (data) {
        resolve(param);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteRecord(param) {
  return new Promise((resolve, reject) => {
    Employee.destroy({ where: { id: param.id } })
      .then(function (data) {
        resolve(param);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function checkEmployeeIdExist(param) {
  return new Promise((resolve, reject) => {
    Employee.findOne({
      where: { employee_id: param.employeeId },
    })
      .then(function (data) {
        if (data) {
          reject(new Error(config.messages.employeeIdAlreadyExists));
        } else {
          resolve(param);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = employeeModel;
