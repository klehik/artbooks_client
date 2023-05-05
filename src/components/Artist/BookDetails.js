import { Row, Button } from 'react-bootstrap'

import { useContext, useEffect, useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import ImageView from './ImageView'

import DetailFields from './DetailFields'
import { UserContext } from '../../context/UserContext'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getBookById, updateBook } from '../../reducers/bookSlice'
import Banner from '../Banner'
import { Grid, Container, IconButton, Tooltip } from '@mui/material'
import {
  PublishBookIcon,
  UnpublishBookIcon,
  DeleteBookIcon,
} from '../Icons/BookIcon'
import AdminButtons from '../Manage/AdminButtons'
import Books from './Books'

const BookDetails = () => {
  const { loggedUser } = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const book = useSelector((state) => state.books.book)
  const books = useSelector((state) => state.books.books)
  const status = useSelector((state) => state.books.status)
  const bookMatch = useMatch('/books/:id')

  useEffect(() => {
    dispatch(getBookById(bookMatch.params.id))
  }, [bookMatch])

  if (status === 'loading') {
    return <div>loading</div>
  }
  if (status === 'succeeded' && book) {
    return (
      <>
        <Banner header={book.title} paragraph={book.description}></Banner>
        <Container maxWidth="lg">
          {loggedUser && loggedUser.role === 'admin' ? (
            <AdminButtons book={book} redirect={true} />
          ) : null}

          <Grid container spacing={2}>
            <Grid container item sm={6}>
              <ImageView
                filenames={book.images.map((img) => img.url)}
              ></ImageView>
            </Grid>
            <Grid container item sm={6}>
              <Container>
                <DetailFields book={book}></DetailFields>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

export default BookDetails
