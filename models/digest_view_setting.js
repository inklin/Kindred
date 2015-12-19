'use strict';
module.exports = function(sequelize, DataTypes) {
  var DigestViewSetting = sequelize.define('DigestViewSetting', {
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
    },
    sendAs: {
      type: DataTypes.STRING,
      allowNull: false,
      valdate: {
        isIn: [['full', 'snippet', 'none']],
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
