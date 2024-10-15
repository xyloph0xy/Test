'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull: true, 
        }
      },
      email: {
        type: Sequelize.STRING,
        unique:true, 
        validate:{
          isEmail: true, 
          notNull: true, 
        }
      },
      npp: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true, 
        validate:{
          notNull: true, 
        }
      },
      npp_supervisor: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};