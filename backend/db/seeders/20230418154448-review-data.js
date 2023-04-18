'use strict';

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
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        review: "House was dirty",
        stars: 1,
      },
      {
        review: "This was ok",
        stars: 3,
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options)
  }
};
