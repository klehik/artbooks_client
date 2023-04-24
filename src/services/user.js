const setUser = (user) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    return user
  }
  return null
}

const clearUser = () => {
  localStorage.clear()
}

export default {
  setUser,
  getUser,
  clearUser,
}
