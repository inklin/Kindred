'use strict';
module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define('Section', {
    AccountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
        // add length
      }
    },
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
        notNull: true
        // add length
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notNull: true
      }
    },
    updateId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Section.belongsTo(models.Account, {
          as: 'Author',
          foreignKey: 'AccountId'
        });
        Section.belongsTo(models.Update);
      }
    }
  });
  return Section;
};
