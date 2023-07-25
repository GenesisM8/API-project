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
        userId:2,
        review: "This was an awesome spot!",
        stars: 5,
      },

      {
spotId: 2,
userId: 3,
review: "Beautiful location with breathtaking views!",
stars: 4,
},

{
spotId: 3,
userId: 4,
review: "Had a great time here! Highly recommended.",
stars: 5,
},

{
spotId: 4,
userId: 2,
review: "Loved the amenities and friendly staff.",
stars: 4,
},

{
spotId: 5,
userId: 5,
review: "A perfect getaway spot for relaxation.",
stars: 5,
},

{
spotId: 6,
userId: 3,
review: "This place exceeded my expectations!",
stars: 5,
},

{
spotId: 7,
userId: 6,
review: "A bit crowded, but the views were worth it.",
stars: 3,
},

{
spotId: 8,
userId: 2,
review: "Peaceful and serene environment.",
stars: 4,
},

{
spotId: 9,
userId: 1,
review: "The staff was accommodating and friendly.",
stars: 4,
},

{
spotId: 10,
userId: 6,
review: "An unforgettable experience!",
stars: 5,
},

{
spotId: 11,
userId: 1,
review: "Great spot for adventure enthusiasts.",
stars: 4,
},

{
spotId: 12,
userId: 3,
review: "Cozy and romantic setting.",
stars: 5,
},

{
spotId: 13,
userId: 4,
review: "A hidden gem in the tropics.",
stars: 5,
},

{
spotId: 14,
userId: 2,
review: "Average spot with decent facilities.",
stars: 3,
},

{
spotId: 15,
userId: 1,
review: "Could use some improvement in service.",
stars: 2,
},

{
spotId: 16,
userId: 6,
review: "Paradise on earth!",
stars: 5,
},

{
spotId: 17,
userId: 3,
review: "Stunning beachfront property.",
stars: 5,
},

{
spotId: 18,
userId: 4,
review: "A bit pricey but worth every penny.",
stars: 4,
},

{
spotId: 19,
userId: 5,
review: "Not as advertised, disappointed.",
stars: 1,
},

{
spotId: 20,
userId: 1,
review: "The location was a bit remote but peaceful.",
stars: 3,
},

{
spotId: 2,
userId: 6,
review: "Best spot for water sports lovers!",
stars: 5,
},

{
spotId: 1,
userId: 3,
review: "Average experience, expected more.",
stars: 3,
},

{
spotId: 7,
userId: 4,
review: "Great for family vacations.",
stars: 4,
},

{
spotId: 5,
userId: 5,
review: "Unparalleled views and luxury.",
stars: 5,
},

{
spotId: 12,
userId: 2,
review: "Relaxing atmosphere, loved it!",
stars: 4,
},

{
spotId: 3,
userId: 1,
review: "Beautiful beach, a must-visit.",
stars: 5,
}
    

    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options)
  }
};
