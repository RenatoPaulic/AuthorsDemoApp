import axios from '../helpers/axios'

import { GET_ALL_BOOKS, BOOK_OPERATION, BOOK_OPERATION_ERROR}  from './types'

export const getAllBooks = () => async dispatch => {
    try{
        const res = await axios.get(`/api/books`)
        if (res.data.success) 
            dispatch({type:GET_ALL_BOOKS, payload: res.data.data})
    } catch(err){
        dispatch({type: BOOK_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const getAllBooksForUser = () => async dispatch => {
    try{
        const res = await axios.get(`/api/users/${localStorage.getItem('currentUserId')}/books`)
        if (res.data.success) 
            dispatch({type:GET_ALL_BOOKS, payload: res.data.data})
    } catch(err){
        dispatch({type: BOOK_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const createBook = (book) => async dispatch => {
    try{
        const body = book
        const res = await axios.post(`/api/users/${localStorage.getItem('currentUserId')}/books`, body)
        if (res.data.success){
            dispatch({type:BOOK_OPERATION})
            dispatch(getAllBooksForUser())
        }
    } catch(err){
        dispatch({type: BOOK_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const deleteBook = (bookId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/users/${localStorage.getItem('currentUserId')}/books/${bookId}`)
        if (res.data.success){
            dispatch({type:BOOK_OPERATION})
            dispatch(getAllBooksForUser())
        }
    } catch(err){
        dispatch({type: BOOK_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}


export const updateBook = (bookId, book) => async dispatch => {
    try{
        const body = book
        const res = await axios.put(`/api/users/${localStorage.getItem('currentUserId')}/books/${bookId}`, body)
        if (res.data.success){
            dispatch({type:BOOK_OPERATION})
            dispatch(getAllBooksForUser())
        }
    } catch(err){
        dispatch({type: BOOK_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}
