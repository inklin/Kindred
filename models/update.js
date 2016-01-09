'use strict';
module.exports = function(sequelize, DataTypes) {
  var Update = sequelize.define('Update', {
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    draft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Update.hasMany(models.Section, {onDelete: 'cascade', hooks: true});
        Update.hasMany(models.DigestUpdate);
        Update.belongsToMany(models.Digest, {
          through: 'DigestUpdates'
        });
      }
    }
  });
  return Update;
};
