import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import ManageNav from './ManageNav'
import { Route, Routes } from 'react-router-dom'

import BookForm from './BookForm'
import Dashboard from './Dashboard'

const Manage = (props) => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add-book" element={<BookForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>
    </>
  )
}

export default Manage
