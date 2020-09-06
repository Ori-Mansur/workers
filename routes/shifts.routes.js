const express = require('express')

const router = express.Router()

const shiftController = require('../controllers/shifts.controller')

router.get('/',shiftController.query)
router.post('/',shiftController.insert)
router.put('/',shiftController.updateOne)
router.delete('/one/:_id',shiftController.removeOne)


module.exports = router