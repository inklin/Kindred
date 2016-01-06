'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Sections',
      'intro',
      Sequelize.TEXT
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Sections',
      'intro'
    )
  }
};
