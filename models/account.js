'use strict';
module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
        //add unique
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Account.hasOne(models.Person);
        Account.belongsToMany(models.Person, {
          through: 'Contacts',
          as: 'Contacts',
          foreignKey: 'AccountId'
        });
        Account.hasMany(models.Update);
        Account.hasMany(models.Section);
        Account.hasMany(models.Comment);
        Account.hasMany(models.DigestViewSetting);
      }
    }
  });
  return Account;
};
