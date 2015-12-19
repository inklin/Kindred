'use strict';
module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define('Section', {
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        // add length
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        // add length
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    updateId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      }
    },
    draft: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
