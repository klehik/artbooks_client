import axios from 'axios'
import userService from './user'

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL

axios.defaults.withCredentials = true

const login = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, credentials)
    return response
  } catch (error) {
    return error.response
  }
}

const logout = async () => {
  const response = await axios.post(`${baseUrl}/auth/logout`)
  return response
}

const user = async () => {
  const response = await axios.get(`${baseUrl}/auth/user`)

  return response.data
}

const register = async (creds) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, creds)
    return response
  } catch (error) {
    return error.response
  }
}

export default { login, logout, user, register }
