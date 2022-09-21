const express = require('express')
const router = express.Router()
const routerHandlers = require('../routerHandler/departLyricH')
router.post('/departLyric', routerHandlers.departLyric)
module.exports = router   