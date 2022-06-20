'use strict';
const { hashPassword } = require("../helpers/bcrypt");
const fs = require('fs')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync('./dataSeeding/users.json','utf-8'))
     data.forEach(e=>{
       e.password = hashPassword(e.password)
       e.createdAt = new Date()
       e.updatedAt = new Date()
     })
     await queryInterface.bulkInsert('Users',data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
