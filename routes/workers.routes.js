const express = require('express')

const router = express.Router()

const workersController = require('../controllers/workers.controller')

router.get('/',workersController.query)
router.post('/',workersController.insertMany)
router.put('/one',workersController.updateOne)
router.delete('/one/:_id',workersController.removeOne)
// router.get('/month',workersController.getAmountPerMonth)
// router.get('/category',workersController.getAmountPerCategory)


module.exports = router