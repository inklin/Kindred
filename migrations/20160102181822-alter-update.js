'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Updates',
      'draft',
      Sequelize.BOOLEAN
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Updates',
      'draft'
    )
  }
};
