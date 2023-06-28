'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      ['中式', '西式', '義式', '墨西哥式', '五辛素', '蛋奶素', '全素', 'Vegan']
        .map(item => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }), {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {})
  }
}
