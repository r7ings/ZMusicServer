const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/musicStatusCheckH')
router.post('/checkStatus', routerHandlers.musicStatusCheck)
module.exports = router   