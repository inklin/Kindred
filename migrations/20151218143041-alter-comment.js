'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.changeColumn(
        'Comments',
        'AccountId',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Comments',
        'content',
        {
          type: Sequelize.TEXT,
          allowNull: false
        }
      ),
      queryInterface.removeColumn(
        'Comments',
        'UpdateId'
      ),
      queryInterface.addColumn(
        'Comments',
        'SectionId',
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
        'Comments',
        'AccountId',
        {
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.changeColumn(
        'Comments',
        'content',
        {
          type: Sequelize.TEXT,
        }
      ),
      queryInterface.addColumn(
        'Comments',
        'UpdateId',
        {
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.removeColumn(
        'Comments',
        'SectionId'
      )
    ];
  }
};
