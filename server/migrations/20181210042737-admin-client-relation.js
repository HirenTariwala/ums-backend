'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('adminClientRelations', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      AdminId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      ClientId : {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('adminClientRelations'),
};
