import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import authService from './services/auth'
import { UserContext } from './context/UserContext'

import Artist from './components/Artist/Artist'
import Manage from './components/Manage/Manage'
import Artists from './components/Artist/Artists'
import MainNav from './components/MainNav'
import Books from './components/Artist/Books'
import BookDetails from './components/Artist/BookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArtists } from './reducers/artistSlice'
import { Container } from 'react-bootstrap'
import ResponsiveAppBar from './components/Nav'
import Banner from './components/Banner'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [loggedUser, setLoggedUser] = useState()
  const artists = useSelector((state) => state.artists.artists)
  const searchBooks = useSelector((state) => state.books.searchBooks)
  const books = useSelector((state) => state.books.books)
  const dashBooks = useSelector((state) => state.books.dashBooks)
  const dispatch = useDispatch()

  // match url params for details
  const bookMatch = useMatch('/books/:id')
  const book = bookMatch
    ? books.find((book) => String(book.id) === String(bookMatch.params.id)) ||
      dashBooks.find(
        (book) => String(book.id) === String(bookMatch.params.id)
      ) ||
      searchBooks.find(
        (book) => String(book.id) === String(bookMatch.params.id)
      )
    : null

  const artistMatch = useMatch('/artists/:id')
  const artist = artistMatch
    ? artists.find(
        (artist) => String(artist.id) === String(artistMatch.params.id)
      )
    : null

  useEffect(() => {
    const getUser = async () => {
      const user = await authService.user()
      setLoggedUser(user)
      return user
    }
    getUser()
    dispatch(fetchArtists())
  }, [])

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <ToastContainer
        hideProgressBar={true}
        position="top-center"
        autoClose={2000}
      />
      <ResponsiveAppBar></ResponsiveAppBar>

      <Routes>
        <Route
          path="/"
          element={<Banner header={'Book Archive'}></Banner>}
        ></Route>
        <Route path="/books" element={<Books></Books>}></Route>
        <Route
          path="/artists/*"
          element={<Artists artists={artists}></Artists>}
        ></Route>
        <Route path="/manage/*" element={<Manage></Manage>}></Route>
        <Route path="/books/:id" element={<BookDetails book={book} />} />

        <Route
          path="/artists/:id"
          element={<Artist artist={artist}></Artist>}
        />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
