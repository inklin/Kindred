'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        msg: 'Must not be empty'
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        msg: 'Must not be empty'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        msg: 'Must be a valid email address'
      }
    },
    AccountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        msg: 'Must be an integer'
      }
    },
    ReceiveOn: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1,
        max: 7,
        msg: 'Must be an integer between 1-7 (Monday to Sunday)'
      }
    },
    ReceiveAs: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['full', 'snippet', 'none']],
        msg: 'Must be a string: full, snippet, or none'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Person.belongsTo(models.Account);
        Person.hasMany(models.Digest);
        Person.hasMany(models.Contact);
      }
    }
  });
  return Person;
};
