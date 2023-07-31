const { Restaurant, Category, Comment, User, Favorite } = require('../models')
const { Sequelize } = require('sequelize')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const forumController = {
  getForums: async (req, res, next) => {
    try {
      const DEFAULT_NUMBER = 6
      const categoryId = Number(req.query.categoryId) || ''
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_NUMBER
      const offset = getOffset(limit, page)
      if (categoryId !== '' && isNaN(categoryId)) throw new Error('Invalid categoryId')
      if (!req.user) throw new Error('Unauthorized')
      const [restaurants, categories] = await Promise.all([
        Restaurant.findAndCountAll({
          include: Category,
          where: {
            ...categoryId ? { categoryId } : {}
          },
          limit,
          offset,
          order: [['createdAt', 'DESC']],
          nest: true,
          raw: true
        }),
        Category.findAll({ raw: true })
      ])
      const restaurantIds = restaurants.rows.map(r => r.id)
      const favoriteCounts = await Favorite.findAll({
        attributes: ['restaurantId', [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'favoriteCount']],
        where: { restaurantId: restaurantIds },
        group: ['restaurantId'],
        raw: true
      })
      const favoriteCountsMap = favoriteCounts.reduce((map, row) => {
        map[row.restaurantId] = row.favoriteCount
        return map
      }, {})
      const favoritedRestaurantsId = req.user && req.user.FavoritedRestaurants.map(fr => fr.id)
      const data = restaurants.rows.map(r => ({
        ...r,
        description: r.description.substring(0, 40) + '...',
        isFavorited: favoritedRestaurantsId.includes(r.id),
        favoriteCount: favoriteCountsMap[r.id] || 0
      }))
      res.render('forums', {
        restaurants: data,
        categories,
        categoryId,
        pagination: getPagination(limit, page, restaurants.count)
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
  },
  getFeedNews: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll(
        {
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [Category],
          raw: true,
          nest: true
        })
      res.render('feed-news', {
        restaurants
      })
    } catch (err) {
      next(err)
    }
  },
  getFeedComments: async (req, res, next) => {
    try {
      const comments = await Comment.findAll(
        {
          limit: 15,
          order: [['createdAt', 'DESC']],
          include: [User, Restaurant],
          raw: true,
          nest: true
        })
      res.render('feed-comments', {
        comments
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = forumController
