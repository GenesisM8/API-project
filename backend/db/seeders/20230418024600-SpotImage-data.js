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
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/280cf97f-f9f5-4d77-9fe8-a7c430d28ee4?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/c664a7bc-8ffb-4848-a552-830780b33b8d?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5af27ed5-323d-482d-8605-a64d15ac1a97?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/90de688e-3961-47da-b35d-8f4bc85210e4?im_w=1440",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-54336752/original/c766376d-239c-4d1e-b8d6-7702e3e8d322?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-54336752/original/30193ecf-db76-4204-99bb-3e70bc699761?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-54336752/original/a2dff941-9172-4510-b947-30d02b3bc4bf?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/d09ecd34-1578-4846-a096-8e3c4643f100?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/f93a1913-1ce1-48d7-acd1-3c7ce98da1f1?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/c25be80d-6dc9-4846-a38c-a7863a2407e4?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/a08b2dce-d3ac-4ce5-9782-fd419ab727e8?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/8c9b48a8-a9b9-43e4-adbd-f37252e0b2d4?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/d47a118f-315b-4745-8450-d5dfa1b1c1fa?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/ce244035-7b1b-446c-a570-bb863ed37537?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-543405303250325992/original/55b4cc01-741a-4998-a4a7-f70912174d1c.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "image url",
        preview: true
      },
      {
        spotId: 4,
        url: "image url",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/43b6509c-223a-481d-96bf-88687cce70b9?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/46641b6d-f86a-4a56-8172-e4a9c52462c7?im_w=1440",
        preview: true
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options)
  }
};
