exports.loginUser = async (req, res) => {
  res.status(200).send({
    success: true,
    _id: req.user._id
  })
}

exports.logoutUser = async (req, res) => {
  req.logout()
  res.status(200).send({
    success: true
  })
}


