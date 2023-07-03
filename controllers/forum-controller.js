const { Restaurant, Category } = require('../models')

const forumController = {
  getForum: (req, res) => {
    return res.render('forums')
  },
  getRestaurants: async (req, res, next) => {
    try {
      const categoryId = Number(req.query.categoryId) || ''
      const [restaurants, categories] = await Promise.all([
        Restaurant.findAll({
          include: Category,
          where: {
            ...categoryId ? { categoryId } : {}
          },
          nest: true,
          raw: true
        }),
        Category.findAll({ raw: true })
      ])
      const data = restaurants.map(r => ({
        ...r,
        description: r.description.substring(0, 40) + '...'
      }))
      res.render('restaurants', { restaurants: data, categories })
    } catch (err) {
      next(err)
    }
  },
  getRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const restaurant = await Restaurant.findByPk(restaurantId, {
        include: Category,
        nest: true
      })
      if (!restaurant) throw new Error('此餐廳不存在!')
      await restaurant.increment('views')
      console.log(restaurant.views)
      res.render('restaurant', { restaurant: restaurant.toJSON() })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = forumController
