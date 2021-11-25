import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import moment from 'moment'

import { getAllBooksForUser, deleteBook } from '../../actions/author'

import PropTypes from 'prop-types'

const AuthorPage = ({ author: {loading, books}, getAllBooksForUser, deleteBook }) => {
  
  useEffect(() => {getAllBooksForUser()},[getAllBooksForUser])

  const removeBook = (bookId) => deleteBook(bookId)

  return(
    <div className="container"> 
      <h2 className="mt-5"> Books </h2>
        <Link to='/addNewBook' className="btn btn-primary mt-2">Add new Book</Link>
        <table className="table table-hover mt-3 mb-5">
          <thead>
            <tr className="table-dark">
              <th scope="col">Title</th>
              <th scope="col">Created date</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {!loading ? books.map(item => {
            return (
              <tr className="table-secondary" key={item._id}>
                <td>{ item.title }</td>
                <td>{ moment(item.createdDate).format('DD/MM/YYYY hh:mm') }</td>
                <td><Link to='/updateBook' state={{ book: item }} className="btn btn-warning">Edit</Link></td>
                <td><button type="button" className="btn btn-danger" onClick={() => removeBook(item._id)}>Delete</button></td>
              </tr>
            );
          }) : null}
          </tbody>
      </table>
  </div>
  )
}

AuthorPage.prototype = {
  author: PropTypes.object.isRequired,
  getAllBooksForUser: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  author: state.author
})

export default connect(mapStateToProps, {getAllBooksForUser, deleteBook})(AuthorPage)

