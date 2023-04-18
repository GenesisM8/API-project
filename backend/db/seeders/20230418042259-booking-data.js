'use strict';

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
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2021-08-19",
        endDate: "2021-08-20"
      },
      {
        spotId: 4,
        userId: 3,
        startDate: "2021-09-19",
        endDate: "2021-09-20"
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options)
  }
};
