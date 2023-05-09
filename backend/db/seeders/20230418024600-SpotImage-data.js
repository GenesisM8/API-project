'use strict';
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://hips.hearstapps.com/hmg-prod/images/top-airbnb-alternatives-2021-1613057911.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "image url",
        preview: true
      },
      {
        spotId: 3,
        url: "image url",
        preview: false
      },
      {
        spotId: 4,
        url: "image url",
        preview: true
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options)
  }
};
