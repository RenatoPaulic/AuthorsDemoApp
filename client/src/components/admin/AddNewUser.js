import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { createUser } from '../../actions/admin'

import PropTypes from 'prop-types'

const AddNewUser = ({ createUser }) => {
  
    const  [stateDate, setStateData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        userCreatedFlag: false
    })
    
    const {name, surname, email, password, confirmPassword, role, userCreatedFlag} = stateDate;
    
    const onChange = e => setStateData({ ...stateDate, [e.target.name]: e.target.value})
    
    const onSubmit = async e => {
        e.preventDefault()
        createUser({name, surname, email, password, confirmPassword, role}, false)
        setStateData({...stateDate, userCreatedFlag: true})
    }
    
    if(userCreatedFlag) {
        return <Navigate to="/adminPage"/> 
    }

    return(
        <div className="container"> 
            <form className="col-12" onSubmit={e => onSubmit(e)}>    
                <h2 className="mt-5 ">User</h2>
                <div className="form-group">
                    <label for="name" className="form-label mt-4">Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <label for="surname" className="form-label mt-4">Surname</label>
                    <input type="text" className="form-control" name="surname" placeholder="Surname" value={surname} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <label for="email" className="form-label mt-4">Email address</label>
                    <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label for="password" className="form-label mt-4">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" minLength='6' value={password} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label for="confirmPassword" className="form-label mt-4">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" minLength='6' value={confirmPassword} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label for="role" className="form-label mt-4">Role</label>
                    <select className="form-select" name="role" value={role} onChange={e => onChange(e)}>
                        <option>Admin</option>
                        <option>Author</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4 mb-5" value="Register">Submit</button>
            </form>
        </div>
  )
}

AddNewUser.prototype = {
    createUser: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({})
  
export default connect(mapStateToProps, {createUser})(AddNewUser)