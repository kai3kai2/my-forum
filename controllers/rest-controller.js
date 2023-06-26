const { Restaurant } = require('../models')

const restController = {
  getRestaurnts: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true
      })
      res.render('restaurants', { restaurants })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = restController
