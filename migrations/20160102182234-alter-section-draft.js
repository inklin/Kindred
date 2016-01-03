'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Sections',
      'draft'
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Sections',
      'draft',
      Sequelize.BOOLEAN
    )
  }
};
