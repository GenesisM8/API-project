"use strict";
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "433 Drive Caicos",
          city: "Bora Bora",
          state: "Leeward Islands",
          country: "French Polynesia",
          lat: 55.7564358,
          lng: -442.4765627,
          name: "Wind Chime Villa",
          description:
            "From its exclusive location on Turtle Tail peninsula, this secluded beachfront villa has quickly become one of Providenciales most sought-after vacation homes.",
          price: 750,
        },

        {
          ownerId: 2,
          address: "789 Paradise Cove",
          city: "Kauai",
          state: "Hawaii",
          country: "United States of America",
          lat: 55.7564358,
          lng: -442.4765627,
          name: "Emerald Cay",
          description:
            "From its exclusive location on Turtle Tail peninsula, this secluded beachfront villa has quickly become one of Providenciales most sought-after vacation homes.",
          price: 750,
        },

        {
          ownerId: 3,
          address: "456 St Martin Lane",
          city: "Cul-de-Sac",
          state: "St.Martin",
          country: "United States of America",
          lat: 47.7646758,
          lng: -133.4530327,
          name: "Pom House",
          description:
            "Waves lap at the shore, clouds skate across the sky—and it all unfolds right before this breezy St. Martin escape. Fronted by a shaded living and dining area designed to draw everyone out, the villa has a heated pool, too.",
          price: 2500,
        },
        {
          ownerId: 1,
          address: "789 Lane Dominican",
          city: "El Limon",
          state: "Dominican Republic",
          country: "Dominican Republic",
          lat: 47.7843358,
          lng: -167.4739557,
          name: "Villa Arrecife Beach House",
          description:
            "Feel like exploring the Dominican? Start the day with a hike on one of Playa Moron’s many trails. Weave your way around the gated community to find secluded sandy coves for swimming and paddleboarding",
          price: 730,
        },
        {
          ownerId: 1,
          address: "123 St Martin Lane",
          city: "Terres Basses",
          state: "St. Martin",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Villa Mirabelle",
          description:
            "Luxury stay in Terres Basses, Collectivité de Saint-Martin, St. Martin",
          price: 800,
        },

        {
          ownerId: 4,
          address: "876 Caribbean Blvd",
          city: "Tulum",
          state: "Quintana Roo",
          country: "Mexico",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Casa del Mar",
          description: "Private beachfront villa in Tulum with stunning views.",
          price: 1200,
        },

        {
          ownerId: 5,
          address: "234 Palm Avenue",
          city: "Negril",
          state: "Westmoreland",
          country: "Jamaica",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Paradise Cove Retreat",
          description:
            "Escape to this luxurious retreat nestled in the cliffs of Negril.",
          price: 950,
        },

        {
          ownerId: 6,
          address: "789 Reef Road",
          city: "Papeete",
          state: "Tahiti",
          country: "French Polynesia",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Bora Bora Bliss",
          description:
            "Overwater bungalow with direct access to the crystal-clear lagoon.",
          price: 1800,
        },

        {
          ownerId: 2,
          address: "987 Palm Grove",
          city: "Maui",
          state: "Hawaii",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Oceanfront Oasis",
          description:
            "Experience the ultimate luxury in this oceanfront villa in Maui.",
          price: 1800,
        },

        {
          ownerId: 3,
          address: "654 Sunset Boulevard",
          city: "Bali",
          state: "Bali",
          country: "Indonesia",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Villa Serenity",
          description:
            "Unwind in the serenity of this private villa in Bali's lush countryside.",
          price: 1200,
        },

        {
          ownerId: 5,
          address: "321 Paradise Way",
          city: "Port Vila",
          state: "Shefa",
          country: "Vanuatu",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Tropical Haven",
          description:
            "Escape to this tropical haven with a private beach and stunning views.",
          price: 1400,
        },

        {
          ownerId: 4,
          address: "567 Azure Avenue",
          city: "Cancun",
          state: "Quintana Roo",
          country: "Mexico",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Villa del Mar",
          description:
            "Indulge in the luxury of this beachfront villa with mesmerizing views.",
          price: 2000,
        },

        {
          ownerId: 5,
          address: "234 Palm Beach",
          city: "Nassau",
          state: "New Providence",
          country: "Bahamas",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Sunset Retreat",
          description:
            "Relax in this exclusive villa offering breathtaking sunset views over the ocean.",
          price: 2500,
        },

        {
          ownerId: 1,
          address: "789 Tropical Lane",
          city: "Cape Town",
          state: "Western Cape",
          country: "South Africa",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Safari Villa",
          description:
            "Experience the best of both worlds - luxury villa living with safari adventures nearby.",
          price: 2200,
        },

        {
          ownerId: 2,
          address: "876 Palmtree Lane",
          city: "Phuket",
          state: "Phuket",
          country: "Thailand",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Phuket Paradise",
          description:
            "Escape to this luxurious villa in Phuket, surrounded by lush greenery and beaches.",
          price: 1800,
        },

        {
          ownerId: 3,
          address: "456 Coral Cove",
          city: "Maldives",
          state: "Maldives",
          country: "Maldives",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Maldivian Retreat",
          description:
            "Stay in an overwater bungalow and immerse yourself in the beauty of the Maldives.",
          price: 2200,
        },

        {
          ownerId: 4,
          address: "789 Azure Coast",
          city: "Seychelles",
          state: "Seychelles",
          country: "Seychelles",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Seychelles Serenity",
          description:
            "Experience the tranquility of Seychelles in this luxurious beachfront villa.",
          price: 2300,
        },

        {
          ownerId: 6,
          address: "234 Sunset Lane",
          city: "Fiji",
          state: "Fiji",
          country: "Fiji",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Fijian Dream",
          description:
            "Immerse yourself in the Fijian culture and stunning landscapes from this private villa.",
          price: 2000,
        },

        {
          ownerId: 4,
          address: "345 Palm Bay",
          city: "Mauritius",
          state: "Mauritius",
          country: "Mauritius",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Mauritian Bliss",
          description:
            "Enjoy the serenity of Mauritius in this luxurious beachfront villa with a private pool.",
          price: 2100,
        },

        {
          ownerId: 2,
          address: "567 Ocean View",
          city: "Seychelles",
          state: "Seychelles",
          country: "Seychelles",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Secluded Haven",
          description:
            "Experience a secluded paradise on the pristine beaches of Seychelles in this villa.",
          price: 2400,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.bulkDelete(options);
  },
};
