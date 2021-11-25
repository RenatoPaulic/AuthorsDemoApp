import React, { Fragment, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { logout, loadUser } from '../../actions/auth'

const Header = ({ auth: {user, isAuthenticated, loading}, logout, loadUser }) => {

  let additionalLinks = null

  useEffect(() => { loadUser() }, [loadUser])

  const adminLinks = (
    <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to="/" onClick={logout} className="nav-link"> Log out </Link>
        </li>
        <li className="nav-item">
          <Link to="/adminPage" className="nav-link"> {(!loading && isAuthenticated) ? user.name : null} {!loading ? user.surname : null}</Link>
      </li>
    </ul>
   )
  
  const authorLinks = (
    <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to="/bookList" className="nav-link"> Book List </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={logout} className="nav-link"> Log out </Link>
        </li>
        <li className="nav-item">
          <Link to="/authorPage" className="nav-link"> {(!loading && isAuthenticated) ? user.name : null} {!loading ? user.surname : null}</Link>
        </li>
   </ul>
  )

  if(!loading && isAuthenticated) {
    if(user.role === 'Admin')
      additionalLinks = adminLinks
    if(user.role === 'Author')
      additionalLinks = authorLinks
  }

  return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand ms-3">Authors Demo App</Link>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              { <Fragment> {additionalLinks} </Fragment> }
            </ul>
          </div>
        </div>
      </nav>
  )
}

Header.prototype = {  
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout, loadUser})(Header)


