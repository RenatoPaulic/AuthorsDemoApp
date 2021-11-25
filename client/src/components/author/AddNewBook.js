import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { createBook } from '../../actions/author'

import PropTypes from 'prop-types'

const AddNewBook = ({ createBook }) => {
  
    const [stateData, setStateData] = useState({title: '', bookCreatedFlag: false})

    const {title, bookCreatedFlag} = stateData

    const onChange = (e) =>  setStateData({...stateData, title: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        createBook({title})
        setStateData({...stateData, bookCreatedFlag: true})
    }

    if(bookCreatedFlag) {
        return <Navigate to="/authorPage"/> 
    }

  return(
    <div className="container"> 
        <form className="col-12" onSubmit={e => onSubmit(e)}>    
            <h2 className="mt-5 ">Book</h2>
            <div className="form-group">
                <label for="title" className="form-label mt-4">Title</label>
                <input type="text" className="form-control" name="title" placeholder="Title" value={title} onChange={e => onChange(e)} required />
            </div>
            <button type="submit" className="btn btn-primary mt-4 mb-5" value="Submit">Submit</button>
        </form>
    </div>
  )
}

AddNewBook.prototype = {
    createBook: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({})

export default connect(mapStateToProps, {createBook})(AddNewBook)

