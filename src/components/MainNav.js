import { Button, Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { linkStyle } from '../styles/styles'
import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import authService from '../services/auth'
import { ToastContainer, toast } from 'react-toastify'

const MainNav = () => {
  const { loggedUser } = useContext(UserContext)

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <ToastContainer
        hideProgressBar={true}
        position="top-center"
        autoClose={2000}
      />
      <Nav className="container-fluid" id="nav">
        <NavLink style={linkStyle} to="/artists">
          Artists
        </NavLink>

        <NavLink style={linkStyle} to="/books">
          Books
        </NavLink>

        <Nav.Item className="ms-auto">
          {loggedUser ? (
            <NavLink style={linkStyle} to="/manage/dashboard">
              {loggedUser.username}
            </NavLink>
          ) : (
            <NavLink style={linkStyle} to="/manage/login">
              Log in
            </NavLink>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

export default MainNav
