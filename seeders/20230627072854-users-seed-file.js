'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: 'user1',
      cover: 'https://official.yousing.com.tw/wp-content/uploads/2019/07/%E9%A0%90%E8%A8%AD%E9%A0%AD%E5%83%8F-02.jpg',
      introduction: '打些內容來讓大家認識你吧!',
      created_at: new Date(),
      updated_at: new Date(),
      is_admin: 0
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      name: 'user2',
      cover: 'https://official.yousing.com.tw/wp-content/uploads/2019/07/%E9%A0%90%E8%A8%AD%E9%A0%AD%E5%83%8F-02.jpg',
      introduction: '打些內容來讓大家認識你吧!',
      created_at: new Date(),
      updated_at: new Date(),
      is_admin: 0
    }, {
      email: 'admin@forum.com',
      password: await bcrypt.hash('12345678', 10),
      name: 'admin',
      cover: 'https://official.yousing.com.tw/wp-content/uploads/2019/07/%E9%A0%90%E8%A8%AD%E9%A0%AD%E5%83%8F-02.jpg',
      introduction: '打些內容來讓大家認識你吧!',
      created_at: new Date(),
      updated_at: new Date(),
      is_admin: 1
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
