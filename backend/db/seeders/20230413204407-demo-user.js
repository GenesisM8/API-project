'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName:'Demo',
        lastName:'User',
        email: 'demo@user.io',
        username: 'Demo-User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'WilLiam',
        lastName: 'Millar',
        email: 'user1@user.io',
        username: 'William-M',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Richard',
        lastName:'Perez',
        email: 'user2@user.io',
        username: 'Richard-P',
        hashedPassword: bcrypt.hashSync('password')
      },

      {
        firstName: 'Sophia',
        lastName: 'Johnson',
        email: 'sophia.johnson@example.com',
        username: 'SophiaJ',
        hashedPassword: bcrypt.hashSync('password')
        },

        {
        firstName: 'Michael',
        lastName: 'Smith',
        email: 'michael.smith@example.com',
        username: 'MickySmith',
        hashedPassword: bcrypt.hashSync('password')
        },

        {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        username: 'EmDav',
        hashedPassword: bcrypt.hashSync('password')
        }


    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
