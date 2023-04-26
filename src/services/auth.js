import axios from 'axios'
import userService from './user'

const baseUrl = 'https://photobooks.up.railway.app/auth'
axios.defaults.withCredentials = true
const login = async (credentials) => {
  // passport sessions
  try {
    const response = await axios.post(`${baseUrl}/login`, credentials, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    return error.response
  }
}

const logout = async () => {
  // passport sessions
  const response = await axios.post(`${baseUrl}/logout`)
  return response
  // localstorage
  //userService.clearUser()
}

const user = async () => {
  const response = await axios.get(`${baseUrl}/user`)

  return response.data
}

const register = async (creds) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, creds)
    return response
  } catch (error) {
    return error.response
  }
}

export default { login, logout, user, register }
