const express = require('express')
const router = express.Router()

const forumController = require('../controllers/forum-controller')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handlebars')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/forums', forumController.getForum)
router.use('/', (req, res) => res.redirect('/forums'))
router.use('/', generalErrorHandler)

module.exports = router
