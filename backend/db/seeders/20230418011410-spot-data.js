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
        address: "123 St Martin Lane",
        city: "Terres Basses",
        state: "St. Martin",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Villa Mirabelle",
        description: "Luxury stay in Terres Basses, Collectivité de Saint-Martin, St. Martin",
        price: 800
      },
      {
        ownerId: 2,
        address: "456 St Martin Lane",
        city: "Cul-de-Sac",
        state: "St.Martin",
        country: "United States of America",
        lat: 47.7646758,
        lng: -133.4530327,
        name: "Pom House",
        description: "Waves lap at the shore, clouds skate across the sky—and it all unfolds right before this breezy St. Martin escape. Fronted by a shaded living and dining area designed to draw everyone out, the villa has a heated pool, too.",
        price: 950
      },
      {
        ownerId: 3,
        address: "789 Lane Dominican",
        city: "El Limon",
        state: "Dominican Republic",
        country: "Dominican Republic",
        lat: 47.7843358,
        lng: -167.4739557,
        name: "Villa Arrecife Beach House",
        description: "Feel like exploring the Dominican? Start the day with a hike on one of Playa Moron’s many trails. Weave your way around the gated community to find secluded sandy coves for swimming and paddleboarding",
        price: 730
      },
      {
        ownerId: 1,
        address: "433 Drive Caicos",
        city: "Turtle Tail",
        state: "Turks & Caicos Islands",
        country: "Turks & Caicos",
        lat: 55.7564358,
        lng: -442.4765627,
        name: "Wind Chime Villa",
        description: "From its exclusive location on Turtle Tail peninsula, this secluded beachfront villa has quickly become one of Providenciales most sought-after vacation homes.",
        price: 750
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options)
  }
};
