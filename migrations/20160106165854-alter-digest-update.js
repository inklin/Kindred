'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'DigestUpdates',
      'sendAs'
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'DigestUpdates',
      'sendAs',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  }
};
