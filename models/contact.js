'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    PersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Contact.belongsTo(models.Account);
        Contact.belongsTo(models.Person);
      }
    }
  });
  return Contact;
};
