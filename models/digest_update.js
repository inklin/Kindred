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
