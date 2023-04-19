'use strict';
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:1,
        startDate: new Date(2023, 5, 3),
        endDate: new Date(2023, 5, 5)
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(2023, 6, 12),
        endDate: new Date(2023, 6, 20)
      },
      {
        spotId: 4,
        userId: 3,
        startDate: new Date(2023, 10, 10),
        endDate: new Date(2023, 5, 15)
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options)
  }
};
