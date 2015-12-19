'use strict';
module.exports = function(sequelize, DataTypes) {
  var DigestUpdate = sequelize.define('DigestUpdate', {
    UpdateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    DigestId: {
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
        DigestUpdate.belongsTo(models.Digest);
        DigestUpdate.belongsTo(models.Account);
      }
    }
  });
  return DigestUpdate;
};
