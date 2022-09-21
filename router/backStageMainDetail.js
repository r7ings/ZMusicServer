const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/backStageMainDetailH')
router.get('/backStage/MainDetail/getDailyLogin', routerHandlers.getDailyLogin)
router.get('/backStage/MainDetail/getDailyRegister', routerHandlers.getDailyRegister)
router.get('/backStage/MainDetail/getDailyCardListDetail', routerHandlers.getCardListDetail)
router.get('/backStage/MainDetail/getTotalUser', routerHandlers.getTotalUser)
router.get('/backStage/MainDetail/getTotalMusic', routerHandlers.getTotalMusic)
router.get('/backStage/MainDetail/getScrollData', routerHandlers.getScrollData)
router.get('/backStage/MainDetail/getTencentData', routerHandlers.getTencentData)
router.get('/backStage/MainDetail/getDailyPlay', routerHandlers.getDailyPlay)
router.get('/backStage/MainDetail/getTopFive', routerHandlers.getTopFive)
module.exports = router