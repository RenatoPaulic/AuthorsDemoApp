const express = require('express')
const {authenticate, authorize} = require('../middleware/auth')

const bookController = require('../controllers/books')

const router = express.Router()

router.get('/', authenticate, authorize('Author'), bookController.getAllBooks)

module.exports = router