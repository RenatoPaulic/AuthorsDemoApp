
exports.validateUserRegistrationInput = (user) => {
    return (user.name && user.surname && user.email && user.password && user.confirmPassword && (user.password === user.confirmPassword))
}

exports.validateBookCreateInput = (book) => {
    return (book.title && book.author)
}