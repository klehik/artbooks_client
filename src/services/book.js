import axios from 'axios'

const baseUrl = 'https://photobooks.up.railway.app/book'

const uploadBook = async (bookdata) => {
  try {
    const response = await axios.post(`/book`, bookdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response
  } catch (error) {
    return error.response
  }
}

const getAllBooks = async (query) => {
  const response = await axios.get(`${baseUrl}`, { params: query })
  return response.data
}

const getPublished = async () => {
  const response = await axios.get(`${baseUrl}/published`)
  return response.data
}

const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response
  } catch (error) {
    return error.response
  }
}

const getRequests = async () => {
  const response = await axios.get(`${baseUrl}/requests`)
  return response.data
}

/* const updateBook = async (id, updatedBook) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBook)
    return response
  } catch (error) {
    return error.response
  }
} */

const updateField = async (id, update) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, update)
    return response.data
  } catch (error) {
    return error.response
  }
}

const getImage = async (path) => {
  try {
    console.log('el', path)
    const response = await axios.get(`images/${path}`)
    return response
  } catch (error) {
    return error.response
  }
}

const getBook = async (id) => {
  try {
    console.log('el', id)
    const response = await axios.get(`${baseUrl}/${id}`)

    return response.data.data
  } catch (error) {
    return error.response
  }
}

export default {
  uploadBook,
  getAllBooks,
  deleteBook,
  getImage,
  updateField,
  getBook,
  getRequests,
  getPublished,
}
