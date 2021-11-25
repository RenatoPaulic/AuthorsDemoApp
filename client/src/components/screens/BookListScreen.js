import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllBooks } from '../../actions/author'

import moment from 'moment'

import PropTypes from 'prop-types'

const BookListScreen = ({ author: {loading, books}, getAllBooks }) => {

  useEffect(() => { getAllBooks() }, [getAllBooks])

  return(
    <div className="container"> 
      <table className="table table-hover mt-3 mb-5">
        <thead>
          <tr className="table-dark">
            <th scope="col">Author name</th>
            <th scope="col">Author surname</th>
            <th scope="col">Title</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
        {!loading ? books.map(item => {
          return (
            <tr className="table-secondary" key={item._id}>
              <td>{ item.author.name }</td>
              <td>{ item.author.surname }</td>
              <td>{ item.title }</td>
              <td>{ moment(item.createdDate).format('DD/MM/YYYY hh:mm')}</td>
            </tr>
          );
        }) : null}
        </tbody>
      </table>
    </div>
    )
}

BookListScreen.prototype = {
  getAllBooks: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  author: state.author
})

export default connect(mapStateToProps, {getAllBooks})(BookListScreen)
