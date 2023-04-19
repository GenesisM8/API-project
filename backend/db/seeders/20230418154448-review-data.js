'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
//text
      {
        spotId:1,
        userId:1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: "House was dirty",
        stars: 1,
      },
      {
        spotId: 3,
        userId: 3,
        review: "This was ok",
        stars: 3,
      },
      {
        spotId: 4,
        userId: 3,
        review: "This was ok",
        stars: 2,
      },
      {
        spotId: 1,
        userId: 2,
        review: "This was ok",
        stars: 2,
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options)
  }
};
