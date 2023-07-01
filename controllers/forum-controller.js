const { Restaurant, Category } = require('../models')

const forumController = {
  getForum: (req, res) => {
    return res.render('forums')
  },
  getRestaurants: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findAll({
        include: Category,
        nest: true,
        raw: true
      })
      const data = restaurant.map(r => ({
        ...r,
        description: r.description.substring(0, 40) + '...'
      }))
      console.log(restaurant[0])
      res.render('restaurants', { restaurants: data })
    } catch (err) {
      next(err)
    }
  },
  getRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const restaurant = await Restaurant.findByPk(restaurantId, {
        include: Category,
        nest: true,
        raw: true
      })
      if (!restaurant) throw new Error('此餐廳不存在!')
      res.render('restaurant', { restaurant })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = forumController
