const Book = require('../models/Book')
const { validateBookCreateInput } = require('../helpers/validator')

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).populate('author')
    res.status(200).json({
      success: true,
      data: books
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}

exports.getBooksForUser = async (req, res) => {
  try {
    const books = await Book.find({author: req.params.userId})
    res.status(200).json({
      success: true,
      data: books
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}  

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json({
      success: true,
      data: book
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}

exports.createBook = async (req, res) => {
  if (!validateBookCreateInput({author: req.params.userId, title: req.body.title})) {
    return res.status(400).send({
      success: false,
      error: "Input validation error."
    })
  }

  try {
    const book = await Book.create({author: req.params.userId, title: req.body.title})
    res.status(201).json({
      success: true,
      _id: book._id
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}

exports.updateBook = async (req, res) => {
  try {
   const book = await Book.findByIdAndUpdate(req.params.bookId , req.body, {
        new: true,
        runValidators: true
    })
  
    res.status(200).json({
        success: true,
        data: book
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}
  
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
  
    res.status(200).json({
        success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}
  