'use strict';

module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    name: {
      type: DataType.STRING
    },
    uploaderAccountId: {
      type: DataType.INTEGER
    },
    url: {
      type: DataType.STRING,
      allowNull: false
    },
    mimeType: {
      type: DataType.STRING
    },
    fileExtension: {
      type: DataType.STRING
    },
    path: {
      type: DataType.STRING
    },
    created: {
      type: DataType.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        File.belongsTo(models.Account, {
          foreignKey: 'uploaderAccountId'
        });
      }
    }
  });
  return File;
}
