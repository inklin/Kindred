'use strict';
module.exports = function(sequelize, DataTypes) {
  var Digest = sequelize.define('Digest', {
    PersonId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    readAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    sentAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Digest.belongsToMany(models.Update, {
          through: 'DigestUpdates'
        });
        Digest.belongsTo(models.Person, {
          as: 'Recipient',
          foreignKey: 'PersonId'
        });
      }
    }
  });
  return Digest;
};
