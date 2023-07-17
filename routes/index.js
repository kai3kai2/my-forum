const express = require('express')
const passport = require('../config/passport')
// const csrf = require('csurf')
// const cookieParser = require('cookie-parser')
const router = express.Router()
const forumController = require('../controllers/forum-controller')
const userController = require('../controllers/user-controller')
const commentController = require('../controllers/comment-controller')
const manage = require('./modules/manage')
const auth = require('./modules/auth')
const { generalErrorHandler } = require('../middleware/error-handlebars')
const { authenticated, authenticatedUser, authenticatedAdmin } = require('../middleware/auth')

// router.use(cookieParser()) // 待實作CSRF 功能
// const csrfProtection = csrf({ cookie: true })

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)
router.post('/comments', commentController.postComment)
router.delete('/comments/:id', commentController.deleteComment)
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)
router.get('/forums/:id', forumController.getRestaurant)
router.get('/forums', authenticated, authenticatedUser, forumController.getForums)

router.use('/auth', auth)
router.use('/manage', authenticated, authenticatedAdmin, manage)
router.use('/', (req, res) => res.redirect('/forums'))
router.use('/', generalErrorHandler)

module.exports = router
