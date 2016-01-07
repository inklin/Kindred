'use strict';
module.exports = function(sequelize, DataTypes) {
  var DigestRecipientSetting = sequelize.define('DigestRecipientSetting', {
    PersonId: {
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
        msg: 'Must be an integer between 1-7'
      }
    },
    ReceiveAs: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['full', 'snippet', 'none']],
        msg: 'Must be full, snippet, or none'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        DigestRecipientSetting.belongsTo(models.Person);
      }
    }
  });
  return DigestRecipientSetting;
};