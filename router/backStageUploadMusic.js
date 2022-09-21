const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/backStageUploadMusicH')
router.post('/backStage/uploadMusic', routerHandlers.backStageUploadMusic)
module.exports = router   