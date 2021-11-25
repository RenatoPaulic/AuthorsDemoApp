const express = require('express')
const {authenticate, authorize} = require('../middleware/auth')

const userController = require('../controllers/users')
const bookController = require('../controllers/books')

const router = express.Router()

router.get('/:userId', authenticate, userController.getUser)
router.post('/', userController.createUser)

router.get('/', authenticate,  authorize('Admin'), userController.getAllUsers)  
router.put('/:userId', authenticate, authorize('Admin'), userController.updateUser)  
router.delete('/:userId',authenticate, authorize('Admin'), userController.deleteUser)  

router.get('/:userId/books', authenticate, authorize('Author'), bookController.getBooksForUser)
router.get('/:userId/books/:bookId', authenticate, authorize('Author'), bookController.getBook)
router.post('/:userId/books', authenticate, authorize('Author'),bookController.createBook)
router.put('/:userId/books/:bookId', authenticate, authorize('Author'), bookController.updateBook)
router.delete('/:userId/books/:bookId', authenticate, authorize('Author'),bookController.deleteBook)
       
module.exports = router