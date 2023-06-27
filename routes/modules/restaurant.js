const express = require('express')
const router = express.Router()

const restController = require('../../controllers/rest-controller')

router.get('/restaurants/create', restController.createRestaurant)
router.get('/restaurants/:id/edit', restController.editRestaurant)
router.get('/restaurants/:id', restController.getRestaurant)
router.put('/restaurants/:id', restController.putRestaurant)
router.post('/restaurants', restController.postRestaurant)
router.get('/restaurants', restController.getRestaurnts)
router.get('/', (req, res) => res.redirect('/restaurant/restaurants'))

module.exports = router
