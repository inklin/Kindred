'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'DigestViewSettings',
        'AccountId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'DigestViewSettings',
        'PersonId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'DigestViewSettings',
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
        'DigestViewSettings',
        'AccountId',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'DigestViewSettings',
        'PersonId',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'DigestViewSettings',
        'sendAs',
        {
          type: Sequelize.STRING
        }
      )
    ];
  }
};
