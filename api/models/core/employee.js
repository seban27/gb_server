module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    'employee',
    {
      employee_id: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      name: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },

      address: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      phone_code: {
        type: Sequelize.STRING(15),
        notEmpty: true,
      },

      phone: {
        type: Sequelize.INTEGER(15),
        notEmpty: true,
      },

      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
      },

      created_by: {
        type: Sequelize.INTEGER,
      },

      updated_by: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return Employee;
};
