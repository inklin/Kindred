'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Accounts',
      'avatarUrl',
      Sequelize.STRING
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Accounts',
      'avatarUrl'
    )
  }
};
