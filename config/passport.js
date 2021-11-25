const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = passport => {
    passport.use('local', new LocalStrategy( {usernameField: 'email'}, (email, password, done) => {

        User.findOne({ email: email }, (err, user) => {

            if (err) return done(err)
            if (!user)  return done(null, false, { message: 'Incorrect username.' })

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err

                if (!isMatch) { return done(null, false, { message: 'Incorrect password.' }) }
                else { 
                  return done(null, user) }
            })
            
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
      
    passport.deserializeUser((id, done) => {
      User.findById(id, function(err, user) {
        done(err, user)
      })
    })

}