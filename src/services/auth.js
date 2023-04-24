import axios from 'axios'
import userService from './user'

const baseUrl = 'https://photobooks.up.railway.app/'

const login = async (credentials) => {
  // passport sessions
  try {
    const response = await axios.post('/auth/login', credentials)
    return response
  } catch (error) {
    return error.response
  }
}

const logout = async () => {
  // passport sessions
  const response = await axios.post('/auth/logout')
  return response
  // localstorage
  //userService.clearUser()
}

const user = async () => {
  const response = await axios.get('/auth/user')

  return response.data
}

const register = async (creds) => {
  try {
    const response = await axios.post('/auth/register', creds)
    return response
  } catch (error) {
    return error.response
  }
}

export default { login, logout, user, register }
