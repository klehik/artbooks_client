import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { notify } from '../utils'

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL + '/book'

axios.defaults.withCredentials = true

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query }) => {
    const response = await axios.get(`${baseUrl}`, {
      params: query,
    })
    console.log(response.data)
    return response.data
  }
)

export const fetchDashBooks = createAsyncThunk(
  'books/fetchDashBooks',
  async () => {
    const response = await axios.get(`${baseUrl}/dashboard`)
    console.log(response)
    return response.data
  }
)

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (params) => {
    const response = await axios.put(`${baseUrl}/${params.id}`, params.update)
    notify(response.data.message)
    return response.data.data
  }
)

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    notify(response.data.message)
    return response.data.data
  } catch (err) {
    notify(err.response.data.message)
    throw err
  }
})

export const addBook = createAsyncThunk('books/addBook', async (formData) => {
  const response = await axios.post(`${baseUrl}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  notify(response.data.message)
  return response.data.data
})

export const getBookById = createAsyncThunk('books/getBookById', async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
})

const initialState = {
  books: [],
  dashBooks: [],
  status: 'idle',
  error: null,
  pageCount: 100,
  hasMorePages: true,
  page: 1,
  book: null,
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.books = []
    },
    incrementPage: (state) => {
      state.page += 1
    },
  },
  extraReducers(builder) {
    builder
      // books
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload.data

        state.hasMorePages = action.payload.hasMore
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // books for dashboard

      .addCase(fetchDashBooks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDashBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dashBooks = action.payload.data
      })
      .addCase(fetchDashBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // book by id
      .addCase(getBookById.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.book = action.payload.data
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // mutations
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((b) => b.id === action.payload.id)
        state.books[index] = action.payload
        const i = state.dashBooks.findIndex((b) => b.id === action.payload.id)
        state.dashBooks[i] = action.payload
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b.id !== action.payload.id)
        state.dashBooks = state.dashBooks.filter(
          (b) => b.id !== action.payload.id
        )
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload)
        state.dashBooks.push(action.payload)
      })
  },
})

export const { resetState, incrementPage } = bookSlice.actions

export default bookSlice.reducer
