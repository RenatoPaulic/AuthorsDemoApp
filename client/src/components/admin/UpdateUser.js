import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { updateUser } from '../../actions/admin'

import PropTypes from 'prop-types'

const UpdateUser = ({ updateUser }) => {

    let loc = useLocation()
    const { user } = loc.state
  
    const  [stateData, setStateDate] = useState({
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        role: user.role,
        userUpdateFlag: false
    })
    
    const {id, name, surname, email, password, role, userUpdateFlag} = stateData;
    
    const onChange = e => setStateDate({ ...stateData, [e.target.name]: e.target.value})
    
    const onSubmit = async e => {
        e.preventDefault()
        updateUser(id, {name, surname, email, password, role})
        setStateDate({ ...stateData, userUpdateFlag:true})
    }

    if(userUpdateFlag){
        return <Navigate to="/adminPage"/> 
    }
    
    return(
        <div className="container"> 
            <form className="col-12" onSubmit={e => onSubmit(e)}>    
                <h2 className="mt-5 ">Update User</h2>
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
                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" minLength='6' value={password} onChange={e => onChange(e)} required/>
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

UpdateUser.prototype = {
    updateUser: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({})
  
export default connect(mapStateToProps, {updateUser})(UpdateUser)