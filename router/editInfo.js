const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/editInfoH')
router.post('/editInfo/editPassword', routerHandlers.editPassword)
router.post('/editInfo/editNickname', routerHandlers.editNickname)
router.post('/editInfo/changeAvatar', routerHandlers.changeAvatar)
module.exports = router  