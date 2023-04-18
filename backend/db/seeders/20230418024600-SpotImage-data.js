'use strict';

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
        id: 1,
        url: "image url",
        preview: true
      },
      {
        id: 2,
        url: "image url",
        preview: true
      },
      {
        id: 3,
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
