import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import moment from 'moment'

import { getAllUsers, deleteUser } from '../../actions/admin'

import PropTypes from 'prop-types'

const AdminPage = ({admin: {users, loading}, getAllUsers, deleteUser}) => {
  
  useEffect(() => { getAllUsers() },[getAllUsers])

  const removeUser = (userId) => deleteUser(userId)

  return(
    <div className="container"> 
      <h2 className="mt-5"> Users </h2>
      <Link to='/addNewUser' className="btn btn-primary mt-2">Add new User</Link>
      <table className="table table-hover mt-3 mb-5">
        <thead>
          <tr className="table-dark">
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Email</th>
            <th scope="col">Created</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {!loading ? users.map(item => {
          return (
            <tr className="table-secondary" key={item.password}>
              <td>{ item.name }</td>
              <td>{ item.surname }</td>
              <td>{ item.email }</td>
              <td>{ moment(item.createdDate).format('DD/MM/YYYY hh:mm') }</td>
              <td><Link to='/updateUser' state={{ user: item }} className="btn btn-warning">Edit</Link></td>
              <td><button type="button" className="btn btn-danger" onClick={() => removeUser(item._id)}>Delete</button></td>
            </tr>
          );
        } ) : null}
        </tbody>
    </table>
  </div>
  )
}

AdminPage.prototype = {
  users: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  admin: state.admin
})

export default connect(mapStateToProps, {getAllUsers, deleteUser})(AdminPage)

