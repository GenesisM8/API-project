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
        spotId:2,
        userId:1,
        startDate: new Date('2022-08-01'),
        endDate: new Date('2022-08-10')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2022-09-01'),
        endDate: new Date('2022-09-10')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2022-10-01'),
        endDate: new Date('2022-10-10')
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options)
  }
};
