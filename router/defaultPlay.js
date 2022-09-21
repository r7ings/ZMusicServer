const express = require('express')
const router = express.Router()
const defaultPlayHandler = require('../routerHandler/defaultPlay')
router.post('/defaultPlay', defaultPlayHandler.getBinaryFile)
router.post('/defaultPlay/checkStatus', defaultPlayHandler.checkMusicStatus)
module.exports = router  