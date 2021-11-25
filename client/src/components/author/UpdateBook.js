import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { updateBook } from '../../actions/author'

import PropTypes from 'prop-types'

const UpdateBook = ({ updateBook }) => {

    let loc = useLocation()
    const { book } = loc.state
  
    const [stateData, setStateData] = useState({
        title: book.title,
        bookUpdatedFlag: false
    })
    
    const {bookUpdatedFlag, title} = stateData;
    
    const onChange = e => setStateData({ ...stateData, title: e.target.value})
    
    const onSubmit = async e => {
        e.preventDefault()
        updateBook(book._id, {title: title})
        setStateData({ ...stateData, bookUpdatedFlag:true})
    }
    
    if(bookUpdatedFlag) {
        return <Navigate to="/authorPage"/> 
    }

  return(
    <div className="container"> 
        <form className="col-12" onSubmit={e => onSubmit(e)}>    
            <h2 className="mt-5 ">Update Book</h2>
            <div className="form-group">
                <label for="title" className="form-label mt-4">Name</label>
                <input type="text" className="form-control" name="title" placeholder="Name" value={title} onChange={e => onChange(e)} required />
            </div>
            <button type="submit" className="btn btn-primary mt-4 mb-5" value="Update">Update</button>
        </form>
    </div>
  )
}

UpdateBook.prototype = {
    updateBook: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({})
  
export default connect(mapStateToProps, {updateBook})(UpdateBook)