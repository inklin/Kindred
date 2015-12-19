'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'Contacts',
        'AccountId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Contacts',
        'PersonId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'Contacts',
        'AccountId',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.changeColumn(
        'Contacts',
        'PersonId',
        {
          type: Sequelize.INTEGER
        }
      )
    ];
  }
};
