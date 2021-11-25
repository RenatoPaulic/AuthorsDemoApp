const express = require('express')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const helmet = require('helmet')
const hpp = require('hpp')

const init = require('./helpers/initialization')
const config = require('./config/config.json')

const app = express()

require('./config/passport')(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(cors({ origin: config.CLIENT_URL_CORS, credentials: true})) 
app.use(session({ secret: config.SESSION_SECRET, resave: true, saveUninitialized: true}))
app.use(cookieParser(config.SESSION_SECRET))
app.use(passport.initialize())
app.use(passport.session())

connectDB()

app.use('/api/users', require('./routes/users'))
app.use('/api/books', require('./routes/books'))
app.use('/api/auth', require('./routes/auth'))

init.createDefaultAdminUser()

app.listen(config.SERVER_PORT, () => console.log(`Server started on port ${config.SERVER_PORT}`))