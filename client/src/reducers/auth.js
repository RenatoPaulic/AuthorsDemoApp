import { AUTH_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/types'

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null
}

function authReducer(state = initialState, action){
    const {type, payload} = action

    switch (type) {
        case AUTH_SUCCESS:
            localStorage.setItem('currentUserId', payload)
            return { 
                ...state, 
                isAuthenticated: true, 
                loading: true
            }
        case USER_LOADED:
            return { 
                isAuthenticated: true, 
                loading: false, 
                user: payload 
            }
        case AUTH_ERROR: 
            console.error(`Error - ${type}: ${payload.status}, ${payload.msg}`)
            return { 
                isAuthenticated: false, 
                loading: true, 
                user:null 
            }
        case LOGOUT:
            localStorage.removeItem('currentUserId')
            return { 
                isAuthenticated: false, 
                loading: true, 
                user:null 
            }
        default: 
            return state
    }
}

export default authReducer