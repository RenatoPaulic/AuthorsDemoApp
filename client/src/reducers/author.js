import { GET_ALL_BOOKS, BOOK_OPERATION, BOOK_OPERATION_ERROR } from '../actions/types'

const initialState = {
    books: [],
    loading: true
}

function authorReducer(state = initialState, action) {

    const {type, payload} = action

    switch(type){
        case GET_ALL_BOOKS:
           return { 
               books: payload, 
               loading: false
            } 
        case BOOK_OPERATION:
            return { 
                ...state, 
                loading: true 
            }
        case BOOK_OPERATION_ERROR:
            console.error(`Error - ${type}: ${payload.status}, ${payload.msg}`)
            return { 
                ...state, 
                loading: false 
            }
        default: 
            return state
    }
}

export default authorReducer