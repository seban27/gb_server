const bcrypt = require('bcrypt');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'auth_user',
    {
      first_name: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      last_name: {
        type: Sequelize.STRING,
        notEmpty: true,
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: Sequelize.STRING,
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

  User.beforeCreate((user, options) => {
    if (user.password) {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt
        .hash(user.password, salt)
        .then((hash) => {
          user.password = hash;
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  });

  return User;
};
