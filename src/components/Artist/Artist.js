import { Button, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import Books from './Books'

import bookService from '../../services/book'
import BookCard from './BookCard'
import ArtistBooks from './ArtistBooks'

const Artist = ({ artist }) => {
  const { loggedUser } = useContext(UserContext)

  return (
    <>
      {artist.books.length > 0 ? (
        <ArtistBooks artist={artist} />
      ) : (
        <Container>{artist.username} has not uploaded books</Container>
      )}
    </>
  )
}

export default Artist
