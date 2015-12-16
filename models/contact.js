'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    AccountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    PersonId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Contact.belongsTo(models.Account, {
          as: 'Sender',
          foreignKey: 'AccountId'
        });
        Contact.belongsTo(models.Person, {
          as: 'Recipient',
          foreignKey: 'PersonId'
        });
      }
    }
  });
  return Contact;
};
