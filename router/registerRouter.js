const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/registerRouterH')
router.post('/register', routerHandlers.registerRouterH)
// router.post('/register/uploadUserImg', routerHandlers.uploadUserImg)
module.exports = router  