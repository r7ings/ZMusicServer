const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/loginRouterH')
router.post('/login/loginWeb', routerHandlers.loginRouterHandler)
router.post('/login/test', routerHandlers.LoginTest)
router.post('/login/backStage', routerHandlers.backStageLoginRouterHandler)
module.exports = router   