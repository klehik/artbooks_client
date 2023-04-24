import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AccIcon from '@mui/icons-material/AccountBalance'
import userIcon from '../assets/user-icon.png'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import Slide from '@mui/material/Slide'
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth'
import { notify } from '../utils'
import { ToastContainer } from 'react-toastify'

const pages = ['Artists', 'Books']

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const trigger = useScrollTrigger()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = async () => {
    const response = await authService.logout()

    setLoggedUser(null)
    notify(response.data.message)
    setAnchorElUser(null)
    navigate('/manage/login')
  }

  return (
    <>
      <Slide in={!trigger}>
        <AppBar sx={{ bgcolor: 'black' }} position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AccIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Arthive
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AccIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Arthive
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => navigate(`/${page}`.toLowerCase())}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={loggedUser ? loggedUser.username : 'login'}
                      src="./"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {loggedUser ? (
                    <div>
                      <MenuItem
                        key={'dashboard'}
                        onClick={() => {
                          navigate(`/manage/dashboard`)
                          setAnchorElUser(null)
                        }}
                      >
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>

                      <MenuItem
                        key={'add-book'}
                        onClick={() => {
                          navigate(`/manage/add-book`)
                          setAnchorElUser(null)
                        }}
                      >
                        <Typography textAlign="center">
                          Send book request
                        </Typography>
                      </MenuItem>
                      <MenuItem key={'logout'} onClick={() => logout()}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem
                        key={'login'}
                        onClick={() => {
                          navigate(`/manage/login`)
                          setAnchorElUser(null)
                        }}
                      >
                        <Typography textAlign="center">Login</Typography>
                      </MenuItem>
                      <MenuItem
                        key={'signin'}
                        onClick={() => {
                          navigate(`/manage/register`)
                          setAnchorElUser(null)
                        }}
                      >
                        <Typography textAlign="center">Sign up</Typography>
                      </MenuItem>
                    </div>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
    </>
  )
}
export default ResponsiveAppBar
