import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './reducers/bookSlice'
import artistReducer from './reducers/artistSlice'
import searchBookReducer from './reducers/searchBookSlice'

export default configureStore({
  reducer: {
    books: bookReducer,
    artists: artistReducer,
    searchBooks: searchBookReducer,
  },
})
