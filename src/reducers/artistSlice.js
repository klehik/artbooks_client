import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

export const artistSlice = createSlice({
  name: 'artists',
  initialState: {
    artists: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload
    })
  },
})

export const fetchArtists = createAsyncThunk(
  'artists/fetchArtists',
  async () => {
    const response = await axios.get('/artists')
    return response.data.data
  }
)

export const {} = artistSlice.actions

export default artistSlice.reducer
