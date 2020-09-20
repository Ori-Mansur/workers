const express = require('express')

const router = express.Router()

const loginController = require('../controllers/login.controller')
const facebook = require('../services/facebook.service')

router.post('/',loginController.login)
router.get('/',facebook.loginFB)
router.get('/success',facebook.onSuccess)
router.get('/get',facebook.getData)



module.exports = router