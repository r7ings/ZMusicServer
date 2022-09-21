const express = require('express')
const router = express.Router()
const userHandler = require('../routerHandler/user')
router.post('/user', userHandler.login)
module.exports = router  