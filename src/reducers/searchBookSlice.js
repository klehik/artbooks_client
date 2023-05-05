import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL + '/book'

export const fetchSearchBooks = createAsyncThunk(
  'books/searchBooks',
  async ({ query, signal }) => {
    const response = await axios.get(`${baseUrl}`, {
      params: query,
      signal: signal,
    })

    return response.data
  }
)

const initialState = {
  books: [],
  status: 'idle',
}

export const searchSlice = createSlice({
  name: 'searchBooks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchBooks.fulfilled, (state, action) => {
        state.books = action.payload.data
        state.status = 'succeeded'
      })
      .addCase(fetchSearchBooks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchSearchBooks.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export default searchSlice.reducer
