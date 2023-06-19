const bcrypt = require('bcryptjs')
const { User } = require('../models')
// const helpers = require('../helpers/auth-helpers')
// const lodash = require('lodash')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      if (name?.trim().length === 0 || email?.trim().length === 0 || password?.trim().length === 0) throw new Error('還有欄位沒填唷!')
      if (password !== confirmPassword) throw new Error('密碼與確認密碼不相符')
      if (name && name.length > 30) throw new Error('名字上限為30個字')

      const existingEmail = await User.findOne({ where: { email } })
      if (existingEmail) throw new Error('Email 已經註冊過了!')
      const hash = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name,
        email,
        password: hash,
        cover: 'https://official.yousing.com.tw/wp-content/uploads/2019/07/%E9%A0%90%E8%A8%AD%E9%A0%AD%E5%83%8F-02.jpg',
        introduction: '打些內容來讓大家認識你吧!',
        role: 0
      })

      delete newUser.password
      res.redirect('/signin')
    } catch (err) {
      res.render('error', { message: err.message })
    }
  }
}
module.exports = userController
