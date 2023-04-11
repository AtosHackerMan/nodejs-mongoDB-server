const express = require('express')
const router = express.Router()
const handleLogout = require('../controllers/logoutController')

router.route('/')
    .post(handleLogout)

module.exports = router