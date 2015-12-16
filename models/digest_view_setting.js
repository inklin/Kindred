'use strict';
module.exports = function(sequelize, DataTypes) {
  var DigestViewSetting = sequelize.define('DigestViewSetting', {
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
    },
    sendAs: {
      type: DataTypes.STRING,
      valdate: {
        isIn: [['full', 'snippet', 'none']],
        notNull: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        DigestViewSetting.belongsTo(models.Account, {
          as: 'Recipient',
          foreignKey: 'AccountId'
        });
        DigestViewSetting.belongsTo(models.Person, {
          as: 'Sender',
          foreignKey: 'PersonId'
        });
      }
    }
  });
  return DigestViewSetting;
};
