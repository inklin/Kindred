'use strict';
module.exports = function(sequelize, DataTypes) {
  var Digest = sequelize.define('Digest', {
    PersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
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
    },
    sendAs: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['full', 'snippet', 'none']]
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
