'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Digests',
      'sendAs',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInferface.removeColumn(
      'Digests',
      'sendAs'
    )
  }
};
