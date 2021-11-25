import { combineReducers } from 'redux'

import auth from './auth'
import admin from './admin'
import author from './author'

export default combineReducers ({
    auth,
    admin,
    author
})