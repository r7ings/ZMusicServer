const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/getListH')
router.get('/getList/getPlayingList', routerHandlers.getPlayingList)
router.get('/getList/getFavouriteList', routerHandlers.getFavouriteList)
module.exports = router   