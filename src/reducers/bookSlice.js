import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import { notify } from '../utils'

const baseUrl = 'https://photobooks.up.railway.app/book'

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query }) => {
    const response = await axios.get(`/book`, {
      params: query,
    })
    console.log(response.data)
    return response.data
  }
)

export const fetchDashBooks = createAsyncThunk(
  'books/fetchDashBooks',
  async () => {
    const response = await axios.get(`/book/dashboard`)
    console.log(response)
    return response.data
  }
)

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async (params) => {
    const response = await axios.put(`/book/${params.id}`, params.update)
    notify(response.data.message)
    return response.data.data
  }
)

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  try {
    const response = await axios.delete(`/book/${id}`)
    notify(response.data.message)
    return response.data.data
  } catch (err) {
    notify(err.response.data.message)
    throw err
  }
})

export const addBook = createAsyncThunk('books/addBook', async (formData) => {
  const response = await axios.post(`/book`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  notify(response.data.message)
  return response.data.data
})

export const fetchSearchBooks = createAsyncThunk(
  'books/fetchBookTitles',
  async ({ query, signal }) => {
    const response = await axios.get(`/book`, {
      params: query,
      signal: signal,
    })
    console.log(response.data)
    return response.data
  }
)

const initialState = {
  books: [],
  dashBooks: [],
  searchBooks: [],
  searchStatus: 'idle',
  status: 'idle',
  error: null,
  pageCount: 100,
  hasMorePages: true,
  page: 1,
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
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.books = action.payload.data

        state.pageCount = action.payload.pageCount
        state.hasMorePages = Boolean(state.page < state.pageCount)
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetchDashBooks.fulfilled, (state, action) => {
        state.dashBooks = action.payload.data
      })

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
      .addCase(fetchSearchBooks.fulfilled, (state, action) => {
        state.searchBooks = action.payload.data
        state.searchStatus = 'succeeded'
      })
      .addCase(fetchSearchBooks.pending, (state, action) => {
        state.searchStatus = 'loading'
      })
  },
})

export const { resetState, incrementPage } = bookSlice.actions

export default bookSlice.reducer
