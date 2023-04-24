import { useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import authService from '../../services/auth'
import { linkStyle } from '../../styles/styles'
import { notify } from '../../utils'
import { useDispatch } from 'react-redux'
import { resetState } from '../../reducers/bookSlice'

const ManageNav = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const navigate = useNavigate()

  const logout = async () => {
    const response = await authService.logout()

    setLoggedUser(null)
    notify(response.data.message)

    navigate('/manage/login')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="ms-auto" id="nav">
        {loggedUser ? (
          <>
            <NavLink style={linkStyle} to="/manage/dashboard">
              Dashboard
            </NavLink>
            <NavLink style={linkStyle} to="/manage/add-book">
              Add book
            </NavLink>
            <NavLink style={linkStyle} onClick={logout} to="/manage/logout">
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink style={linkStyle} to="/manage/login">
              Log in
            </NavLink>
            <NavLink style={linkStyle} to="/manage/register">
              Create artist account
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  )
}

export default ManageNav
