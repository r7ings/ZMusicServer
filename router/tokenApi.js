const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/tokenApiH')
router.post('/tokenApi', routerHandlers.tokenApiHandler)
module.exports = router  