import { GET_ALL_USERS, USER_OPERATION, USER_OPERATION_ERROR } from '../actions/types'

const initialState = {
    users: [],
    loading: true,
    error: {}
}

function adminReducer(state = initialState, action){

    const {type, payload} = action

    switch(type){
        case GET_ALL_USERS:
           return { 
               ...state, 
               users: payload, loading: false 
            } 
        case USER_OPERATION:
            return { 
                ...state,
                loading: true 
            } 
        case USER_OPERATION_ERROR:
            console.error(`Error - ${type}: ${payload.status}, ${payload.msg}`)
            return { 
                ...state, 
                error: payload, 
                loading: false 
            }
        default:
            return state
    }
}

export default adminReducer