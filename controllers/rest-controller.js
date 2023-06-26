const { Restaurant } = require('../models')

const restController = {
  getRestaurnts: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true
      })
      res.render('restaurant/restaurants', { restaurants })
    } catch (err) {
      next(err)
    }
  },
  createRestaurant: async (req, res, next) => {
    try {
      res.render('restaurant/create-restaurant')
    } catch (err) {
      next(err)
    }
  },
  postRestaurant: async (req, res, next) => {
    try {
      const { name, tel, address, openingHours, description } = req.body

      if (!name) throw new Error('Restaurant name ir required!')
      await Restaurant.create({
        name,
        tel,
        address,
        openingHours,
        description
      })
      req.flash('success_messages', '創建成功！')
      res.redirect('/restaurant/restaurants')
    } catch (err) {
      next(err)
    }
  }
}
module.exports = restController
