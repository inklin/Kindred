'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    AccountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    ReceiveOn: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1,
        max: 7
      }
    },
    ReceiveAs: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['full', 'snippet', 'none']]
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
