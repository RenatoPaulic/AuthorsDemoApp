const express = require('express')
const passport = require('passport')
const { authenticate } = require('../middleware/auth')
const localAuth =  passport.authenticate('local', {session: true})
const {
    loginUser,
    logoutUser
} = require('../controllers/auth')

const router = express.Router()

router.post('/login', localAuth, loginUser)
router.post('/logout', authenticate, logoutUser)

module.exports = router