import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { createUser } from '../../actions/admin'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

const RegisterSection = ({ auth: {user, isAuthenticated, loading}, createUser }) => {

  const [formData, setFormData] = useState({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: ''
  })

  const {name, surname, email, password, confirmPassword} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
      e.preventDefault()
      createUser({name, surname, email, password, confirmPassword}, true)
  }

  if(!loading && isAuthenticated){
    return user.role === 'Admin' ? <Navigate to="/adminPage"/> : <Navigate to="/authorPage"/> 
  }

  return(
    <div className="container"> 
      <form className="col-12" onSubmit={e => onSubmit(e)}>    
        <h2 className="mt-5 text-center">Register</h2>
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
        <button type="submit" className="btn btn-primary mt-4 mb-5" value="Register">Submit</button>
      </form>
    </div>
  )
}

RegisterSection.prototype = {
  createUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {createUser})(RegisterSection)

