'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'DigestUpdates',
        'UpdateId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'DigestUpdates',
        'DigestId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'DigestUpdates',
        'sendAs',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'DigestUpdates',
        'UpdateId',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'DigestUpdates',
        'DigestId',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'DigestUpdates',
        'sendAs',
        {
          type: Sequelize.STRING
        }
      )
    ];
  }
};
