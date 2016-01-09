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
        // TODO add length
      }
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        // TODO add length
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        // TODO add length
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    UpdateId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Section.belongsTo(models.Account, {
          as: 'Author',
          foreignKey: 'AccountId'
        });
        Section.hasMany(models.Comment, {
          foreignKey: 'SectionId'
        });

        Section.belongsTo(models.Update);
      }
    }
  });
  return Section;
};
