const express = require('express')
const router = express.Router()

const restController = require('../../controllers/rest-controller')
const upload = require('../../middleware/multer')

router.get('/restaurants/create', restController.createRestaurant)
router.get('/restaurants/:id/edit', restController.editRestaurant)
router.get('/restaurants/:id', restController.getRestaurant)
router.put('/restaurants/:id', upload.single('image'), restController.putRestaurant)
router.delete('/restaurants/:id', restController.deleteRestaurant)
router.post('/restaurants', upload.single('image'), restController.postRestaurant)
router.get('/restaurants', restController.getRestaurnts)
router.get('/', (req, res) => res.redirect('/restaurant/restaurants'))

module.exports = router
