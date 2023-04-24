import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './reducers/bookSlice'
import artistReducer from './reducers/artistSlice'

export default configureStore({
  reducer: {
    books: bookReducer,
    artists: artistReducer,
  },
})
