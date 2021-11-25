const User = require('../models/User')
const bcrypt = require('bcrypt')

const { validateUserRegistrationInput } = require('../helpers/validator')

exports.createUser = async (req, res) => {
  if (!validateUserRegistrationInput(req.body)) {
    return res.status(400).send({
      success: false,
      error: "Input validation error."
    })
  }
  const {name, surname, email, password, role} = req.body
  try {
    const user = await User.findOne({email})
    if (user) {
      return res.status(400).send({
        success: false,
        error: "User with the same email exist in system."
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({name, surname, email, password: hashedPassword, role})
    res.status(201).json({
      success: true,
      _id: newUser._id,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({
      success: true,
      data: users,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password')
    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
   const user = await User.findByIdAndUpdate(req.params.userId , req.body, {
        new: true,
        runValidators: true
    })
  
    res.status(200).json({
        success: true,
        data: user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
  }
}
  
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
  
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
