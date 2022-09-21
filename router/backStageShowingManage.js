const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/backStageShowingManageH')
router.post('/backStageShowingManage/web/changeCardName', routerHandlers.changeCardName)
router.post('/backStageShowingManage/web/changeCardList', routerHandlers.changeCardList)
router.post('/backStageShowingManage/web/singleAddToCard', routerHandlers.singleAddToCard)

module.exports = router   