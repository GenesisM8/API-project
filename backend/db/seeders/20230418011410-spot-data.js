'use strict';
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [

      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "Florida",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Disney House",
        description: "Place where dreams come true",
        price: 123
      },
      {
        ownerId: 2,
        address: "456 New York Lane",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 47.7646758,
        lng: -133.4530327,
        name: "Manhattan House",
        description: "Big Apple, nice view",
        price: 350
      },
      {
        ownerId: 3,
        address: "789 Chicago Lane",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 47.7843358,
        lng: -167.4739557,
        name: "Chicago House",
        description: "Water and city view",
        price: 230
      },
      {
        ownerId: 1,
        address: "112 Vegas Lane",
        city: "Las Vegas",
        state: "Nevada",
        country: "United States of America",
        lat: 55.7564358,
        lng: -442.4765627,
        name: "Vegas House",
        description: "Close to shows, and entertainment",
        price: 450
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options)
  }
};
