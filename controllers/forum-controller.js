const { Restaurant, Category, Comment, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const forumController = {
  getForum: (req, res) => {
    return res.render('forums')
  },
  getRestaurants: async (req, res, next) => {
    try {
      const DEFAULT_NUMBER = 6
      const categoryId = Number(req.query.categoryId) || ''
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_NUMBER
      const offset = getOffset(limit, page)
      const [restaurants, categories] = await Promise.all([
        Restaurant.findAndCountAll({
          include: Category,
          where: {
            ...categoryId ? { categoryId } : {}
          },
          limit,
          offset,
          nest: true,
          raw: true
        }),
        Category.findAll({ raw: true })
      ])
      const data = restaurants.rows.map(r => ({
        ...r,
        description: r.description.substring(0, 40) + '...繼續閱讀'
      }))
      res.render('restaurants', {
        restaurants: data,
        categories,
        categoryId,
        pagination: getPagination(limit, page, restaurants.counts)
      })
    } catch (err) {
      next(err)
    }
  },
  getRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const restaurant = await Restaurant.findByPk(restaurantId, {
        include: [
          Category,
          { model: Comment, include: User }
        ]
      })
      if (!restaurant) throw new Error('此餐廳不存在!')
      await restaurant.increment('views')
      res.render('restaurant', { restaurant: restaurant.toJSON() })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = forumController
