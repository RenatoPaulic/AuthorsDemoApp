import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

const PrivateRoute = ( {auth: {isAuthenticated, loading}, children }) => {
    return (isAuthenticated && !loading) ? children : <Navigate to='/login'/>
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
