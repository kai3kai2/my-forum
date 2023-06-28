const { Restaurant, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

const restController = {
  getRestaurnts: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        nest: true,
        include: [Category]
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
      const { file } = req // 把檔案取出 等於 const file = req.file 寫法
      const localFile = await localFileHandler(file)
      if (!name) throw new Error('Restaurant name ir required!')
      await Restaurant.create({
        name,
        tel,
        address,
        openingHours,
        description,
        image: localFile || null
      })
      req.flash('success_messages', '創建成功！')
      res.redirect('/restaurant/restaurants')
    } catch (err) {
      next(err)
    }
  },
  getRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const restaurant = await Restaurant.findByPk(restaurantId, {
        raw: true,
        nest: true,
        include: [Category]
      })
      if (!restaurant) throw new Error('此餐廳不存在!')
      res.render('restaurant/restaurant', { restaurant })
    } catch (err) {
      next(err)
    }
  },
  editRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const restaurant = await Restaurant.findByPk(restaurantId, {
        raw: true
      })
      if (!restaurant) throw new Error('此餐廳不存在!')
      res.render('restaurant/edit-restaurant', { restaurant })
    } catch (err) {
      next(err)
    }
  },
  putRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const { file } = req
      const { name, tel, address, openingHours, description } = req.body
      const [restaurant, localFile] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        localFileHandler(file)
      ])
      if (!restaurant) throw new Error('這間餐廳不存在!')
      await restaurant.update({
        name,
        tel,
        address,
        openingHours,
        description,
        image: localFile || null
      })
      req.flash('success_messages', '修改成功!')
      res.redirect('/restaurant/restaurants')
    } catch (err) {
      next(err)
    }
  },
  deleteRestaurant: async (req, res, next) => {
    try {
      const restaurantId = req.params.id
      const delRestaurant = await Restaurant.findByPk(restaurantId)
      if (!delRestaurant) throw new Error('這間餐廳不存在!')
      await delRestaurant.destroy()
      res.redirect('/restaurant/restaurants')
    } catch (err) {
      next(err)
    }
  }
}
module.exports = restController
