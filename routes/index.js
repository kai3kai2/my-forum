const express = require('express')
const passport = require('../config/passport')
// const csrf = require('csrf')
// const cookieParser = require('cookie-parser')
const router = express.Router()
const forumController = require('../controllers/forum-controller')
const userController = require('../controllers/user-controller')
const commentController = require('../controllers/comment-controller')
const manage = require('./modules/manage')
const { generalErrorHandler } = require('../middleware/error-handlebars')
const { authenticated, authenticatedUser } = require('../middleware/auth')

// router.use(cookieParser()) // 待實作CSRF 功能
// const csrfProtection = csrf({ cookie: true })

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)
router.get('/forums', authenticated, authenticatedUser, forumController.getForum)
router.post('/comments', commentController.postComment)
router.delete('/comments/:id', commentController.deleteComment)
router.get('/restaurants/:id', forumController.getRestaurant)
router.get('/restaurants', forumController.getRestaurants)

router.use('/manage', manage) // authenticated, authenticatedUser,
router.use('/', (req, res) => res.redirect('/forums'))
router.use('/', generalErrorHandler)

module.exports = router
