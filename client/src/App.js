import './css/bootstrap.min.css'

import React, {Fragment} from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'

import Header from './components/layout/Header'

import LandingScreen from './components/screens/LandingScreen'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BookListScreen from './components/screens/BookListScreen'

import AdminPage from './components/admin/AdminPage'
import AddNewUser from './components/admin/AddNewUser'
import UpdateUser from './components/admin/UpdateUser'

import AuthorPage from './components/author/AuthorPage'
import AddNewBook from './components/author/AddNewBook'
import UpdateBook from './components/author/UpdateBook'

import PrivateRoute from './components/routing/PrivateRoute'

import store from './store'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
        <Header/>
        <Routes >
          <Route exact path="/" element={<LandingScreen/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/bookList" element={<PrivateRoute> <BookListScreen/> </PrivateRoute>} />
          <Route exact path="/adminPage" element={<PrivateRoute> <AdminPage/> </PrivateRoute>} />
          <Route exact path="/authorPage" element={<PrivateRoute> <AuthorPage/> </PrivateRoute>} />
          <Route exact path="/addNewUser" element={<PrivateRoute> <AddNewUser/> </PrivateRoute>} />
          <Route exact path="/updateUser" element={<PrivateRoute> <UpdateUser/> </PrivateRoute>} />
          <Route exact path="/addNewBook" element={<PrivateRoute> <AddNewBook/> </PrivateRoute>} />
          <Route exact path="/updateBook" element={<PrivateRoute> <UpdateBook/> </PrivateRoute>} />
          <Route exact path="*" element={<LandingScreen/>} />
        </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
