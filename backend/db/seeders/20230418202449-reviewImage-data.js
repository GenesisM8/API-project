'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [

      {
        reviewId: 1,
        url: "image url",
      },
      {
        reviewId: 1,
        url: "image url",
      },
      {
        reviewId: 1,
        url: "image url",
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options)
  }
};
