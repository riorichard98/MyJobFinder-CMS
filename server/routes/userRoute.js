const express = require('express')
const { UserController } = require('../controllers/userController')
const { authN } = require('../middlewares/authN')
const router = express.Router()
router.post('/login',UserController.afterLogin)
router.use(authN)
router.post('/register',UserController.afterRegister)
module.exports = router