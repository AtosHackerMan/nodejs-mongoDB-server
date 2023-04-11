const express = require('express')
const router = express.Router()
const {sendIndex, sendNewPage, redirectOldPage, routeHandler, sendHello, sendChain} = require('../controllers/rootController')

// We use regex to make the .html part optional with ()? and also to make it accept both "/" and "index(.html)?"
router.get('^/$|index(.html)?', sendIndex)

router.get('/new-page(.html)?', sendNewPage)

router.get('/old-page(.html)?', redirectOldPage)

// Route handlers
router.get('/hello(.html)?', routeHandler, sendHello)

// Chained handlers
router.get('/chain(.html)?', sendChain)

module.exports = router