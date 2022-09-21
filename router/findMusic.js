const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/findMusicH')
router.get('/findMusic/getCards', routerHandlers.getCards)
router.post('/findMusic/getCards/getInfos', routerHandlers.getInfos)
module.exports = router   