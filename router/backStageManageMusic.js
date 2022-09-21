const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/backStageManageMusicH')
router.get('/backStage/manageMusic/getMusicList', routerHandlers.getMusicList)
router.post('/backStage/manageMusic/changeMusicStatus', routerHandlers.changeMusicStatus)
router.post('/backStage/manageMusic/editMusicInfo', routerHandlers.editMusicInfo)
module.exports = router