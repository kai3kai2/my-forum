const express = require('express')
const router = express.Router()

const forumController = require('../controllers/forum-controller')

router.get('/forums', forumController.getForum)
router.use('/', (req, res) => res.redirect('/forums'))

module.exports = router
