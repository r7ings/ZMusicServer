const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/searchMusicH')
router.post('/searchMusic', routerHandlers.searchMusic)
router.post('/searchMusic/addToFavourite', routerHandlers.searchMusic_addToFavourite)
module.exports = router   