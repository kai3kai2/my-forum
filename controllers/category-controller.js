const { Category } = require('../models')

const categoryController = {
  getCategories: async (req, res, next) => {
    try {
      const categoryId = req.params.id
      const [categories, category] = await Promise.all([
        Category.findAll({ raw: true }),
        categoryId ? Category.findByPk(categoryId, { raw: true }) : null
      ])
      res.render('manage/categories', { categories, category })
    } catch (err) {
      next(err)
    }
  },
  postCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('請輸入內容!')
      const category = await Category.findOne({ where: { name }, raw: true })
      if (category) {
        req.flash('warning_messages', '此種類已存在!')
        return res.redirect('/manage/categories')
      }

      await Category.create({ name })
      req.flash('success_messages', ' 新增類別成功!')
      res.redirect('/manage/categories')
    } catch (err) {
      next(err)
    }
  },
  putCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      const categoryId = req.params.id
      if (!name) throw new Error('請輸入內容!')

      const editCategory = await Category.findByPk(categoryId)
      if (!editCategory) throw new Error('此種類不存在!')

      const existingCategory = await Category.findOne({ where: { name } })
      if (existingCategory) {
        req.flash('warning_messages', '此種類已存在!')
        return res.redirect('/manage/categories')
      }

      await editCategory.update({ name })
      req.flash('success_messages', '修改成功!')
      res.redirect('/manage/categories')
    } catch (err) {
      next(err)
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const categoryId = req.params.id
      const delCategory = await Category.findByPk(categoryId)
      if (!delCategory) throw new Error('無法刪除不存在的種類!')
      delCategory.destroy()
      req.flash('success_messages', '刪除成功!')
      res.redirect('/manage/categories')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = categoryController
