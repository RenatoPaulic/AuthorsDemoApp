import React, { useState }  from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../actions/auth'

import PropTypes from 'prop-types'

const LoginSection = ({ auth: {user, isAuthenticated, loading}, login }) => {

  const  [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
      e.preventDefault()
      login({email, password})
  } 

  if(!loading && isAuthenticated){
    return user.role === 'Admin' ? <Navigate to="/adminPage"/> : <Navigate to="/authorPage"/> 
  }

  return(
    <div className="container"> 
      <form className="col-12" onSubmit={e => onSubmit(e)}>    
          <h2 className="mt-5 text-center">Log in</h2>
          <div className="form-group">
            <label for="email" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={e => onChange(e)} required/>
          </div>
          <div className="form-group">
            <label for="password" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" minLength='6' value={password} onChange={e => onChange(e)} required/>
          </div>
          <button type="submit" className="btn btn-primary mt-4 mb-5" value="Login" >Submit</button>
      </form>
    </div>
  )
}

LoginSection.prototype = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {login})(LoginSection)

