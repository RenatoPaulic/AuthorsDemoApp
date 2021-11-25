import axios from '../helpers/axios'

import { AUTH_SUCCESS, AUTH_ERROR, USER_LOADED, LOGOUT } from './types'

export const loadUser = () => async dispatch => {
    try{
        const res = await axios.get(`/api/users/${localStorage.getItem('currentUserId')}`)
        if(res.data.success) 
            dispatch({type: USER_LOADED, payload: res.data.data})
    }catch (err){
        dispatch({type: AUTH_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const login = ({email, password}) => async dispatch => {
    const body  = JSON.stringify({email, password})
    try{
        const res = await axios.post('/api/auth/login', body)
        if(res.data.success) {
            dispatch({type: AUTH_SUCCESS, payload: res.data._id})
            dispatch(loadUser())
        }
    }catch(err){
        dispatch({type: AUTH_ERROR, payload: {msg: err.response ? err.response.statusText : "Network Error", status: err.response ? err.response.status : 500}})
    }
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}

