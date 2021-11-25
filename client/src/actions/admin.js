import axios from '../helpers/axios'
import { GET_ALL_USERS, USER_OPERATION, USER_OPERATION_ERROR } from '../actions/types'

import { login } from './auth'

export const getAllUsers = () => async dispatch => {
    try{
        const res = await axios.get(`/api/users`)
        if(res.data.success) 
            dispatch({type:GET_ALL_USERS, payload: res.data.data})
    } catch(err){
        dispatch({type: USER_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const createUser = ({name, surname, email, password, confirmPassword, role}, auth) => async dispatch => {
    const body  = JSON.stringify({name, surname, email, password, confirmPassword, role})
    try{
        const res = await axios.post('/api/users', body)
        if(res.data.success) {
            dispatch({type:USER_OPERATION})
            auth ? dispatch(login({email, password})) : dispatch(getAllUsers())
        }
    } catch(err){
        dispatch({type: USER_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const deleteUser = (userId) => async dispatch => {
    try{
        const res = await axios.delete(`/api/users/${userId}`)
        if(res.data.success) {
            dispatch({type:USER_OPERATION})
            dispatch(getAllUsers())
        }
    } catch(err){
        dispatch({type: USER_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}


export const updateUser = (userId, user) => async dispatch => {
    try{
        const body = user
        const res = await axios.put(`/api/users/${userId}`, body)
        if(res.data.success) {
            dispatch({type:USER_OPERATION})
            dispatch(getAllUsers())
        } 
    } catch(err){
        dispatch({type: USER_OPERATION_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}
