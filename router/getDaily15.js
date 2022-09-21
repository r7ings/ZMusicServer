const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/getDaily15H')
router.post('/getDaily15', routerHandlers.getDaily15)
module.exports = router   