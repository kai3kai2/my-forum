const { Comment, User, Restaurant } = require('../models')
const { getUser } = require('../helpers/auth-helpers')
const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { restaurantId, text } = req.body
      const userId = getUser(req).id
      if (!text) throw new Error('沒有填寫評論!')
      const [user, restaurant] = await Promise.all([
        User.findByPk(userId),
        Restaurant.findByPk(restaurantId)
      ])
      if (!user) throw new Error('此使用者不存在!')
      if (!restaurant) throw new Error('此餐廳不存在!')
      await Comment.create({
        text,
        restaurantId,
        userId
      })
      res.redirect(`/forums/${restaurantId}`)
    } catch (err) {
      next(err)
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const userId = req.params.id
      const delComment = await Comment.findByPk(userId)
      if (!delComment) throw new Error('此評論不存在!')
      await delComment.destroy()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = commentController
