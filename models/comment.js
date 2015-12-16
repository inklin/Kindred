'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    AccountId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    UpdateId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notNull: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Account, {
          as: 'Author',
          foreignKey: 'AccountId'
        });
        Comment.belongsTo(models.Update);
      }
    }
  });
  return Comment;
};
