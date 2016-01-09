'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'People',
        'ReceiveAs',
        {
          type: Sequelize.STRING,
          defaultValue: 'full'
        }
      ),
      queryInterface.addColumn(
        'People',
        'ReceiveOn',
        {
          type: Sequelize.INTEGER,
          defaultValue: 1
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
        'People',
        'ReceiveAs'
      ),
      queryInterface.removeColumn(
        'People',
        'ReceiveOn'
      )
    ];
  }
};
