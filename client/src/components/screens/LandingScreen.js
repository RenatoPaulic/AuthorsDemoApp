import React from 'react'

import {Link} from 'react-router-dom'

const LandingScreen = () => {
  return(
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-xs-1 h-100 center-block text-center">
                    <h1>Author Books</h1>
                    <p> Sing in to use the application and add book</p>
                    <Link to="/register" className="btn btn-light m-1">Register</Link>
                    <Link to="/login" className="btn btn-light m-1">Login</Link>
            </div>  
        </div>
    </div>
  )
}

export default LandingScreen 

