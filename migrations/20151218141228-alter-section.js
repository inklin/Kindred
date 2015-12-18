'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'Sections',
        'title',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Sections',
        'AccountId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Sections',
        'body',
        {
          type: Sequelize.TEXT,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Sections',
        'imageUrl',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Sections',
        'draft',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'Sections',
        'title',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.changeColumn(
        'Sections',
        'AccountId',
        {
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.changeColumn(
        'Sections',
        'body',
        {
          type: Sequelize.TEXT,
        }
      ),
      queryInterface.changeColumn(
        'Sections',
        'imageUrl',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.removeColumn(
        'Sections',
        'draft'
      )
    ];
  }
};