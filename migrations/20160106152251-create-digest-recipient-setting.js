'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('DigestRecipientSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PersonId: {
        type: Sequelize.INTEGER
      },
      ReceiveOn: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      ReceiveAs: {
        type: Sequelize.STRING,
        defaultValue: 'full'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('DigestRecipientSettings');
  }
};