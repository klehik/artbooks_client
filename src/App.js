import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import authService from './services/auth'
import { UserContext } from './context/UserContext'

import Manage from './components/Manage/Manage'
import Artists from './components/Artist/Artists'

import Books from './components/Artist/Books'
import BookDetails from './components/Artist/BookDetails'
import { useDispatch, useSelector } from 'react-redux'

import ResponsiveAppBar from './components/Nav'

import { ToastContainer } from 'react-toastify'

import ArtistBooks from './components/Artist/ArtistBooks'
import Footer from './components/Footer'
const App = () => {
  const [loggedUser, setLoggedUser] = useState()

  const artists = useSelector((state) => state.artists.artists)
  const searchBooks = useSelector((state) => state.searchBooks.books)
  const books = useSelector((state) => state.books.books)
  const dashBooks = useSelector((state) => state.books.dashBooks)

  const dispatch = useDispatch()
  console.log(artists, searchBooks, books, dashBooks)
  // match url params
  /* const bookMatch = useMatch('/books/:id')
  const book = bookMatch
    ? artists.books &&
      artists.books.find(
        (book) => String(book.id) === String(bookMatch.params.id)
      )
    : null */

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
    }
    getUser()
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
        <Route path="/" element={<Books></Books>}></Route>
        <Route path="/books" element={<Books></Books>}></Route>
        <Route
          path="/artists/*"
          element={<Artists artists={artists}></Artists>}
        ></Route>
        <Route path="/manage/*" element={<Manage></Manage>}></Route>
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/artists/:id" element={<ArtistBooks artist={artist} />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
