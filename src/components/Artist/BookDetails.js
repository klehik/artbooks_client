import { Row, Button } from 'react-bootstrap'

import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImageView from './ImageView'

import DetailFields from './DetailFields'
import { UserContext } from '../../context/UserContext'

import { useDispatch } from 'react-redux'
import { deleteBook, updateBook } from '../../reducers/bookSlice'
import Banner from '../Banner'
import { Grid, Container } from '@mui/material'

const BookDetails = ({ book }) => {
  const { loggedUser } = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!book) {
    return <div>Loading</div>
  }

  return (
    <>
      <Banner header={book.title} paragraph={book.description}></Banner>
      <Container>
        <Grid
          margin={4}
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <ImageView filenames={book.images.map((img) => img.url)}></ImageView>
        </Grid>
        <Row>
          <DetailFields book={book}></DetailFields>
        </Row>
        {loggedUser && loggedUser.role === 'admin' ? (
          <Container>
            <Button
              style={{ margin: 5 }}
              variant="dark"
              onClick={() => {
                dispatch(deleteBook(book.id))

                navigate('/books')
              }}
            >
              Delete
            </Button>
            {book.published ? (
              <Button
                style={{ margin: 5 }}
                variant="danger"
                onClick={() => {
                  dispatch(
                    updateBook({ id: book.id, update: { published: false } })
                  )
                  navigate('/books')
                }}
              >
                Unpublish
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    dispatch(
                      updateBook({
                        id: book.id,
                        update: { published: true, new: false },
                      })
                    )

                    navigate('/books')
                  }}
                  style={{ margin: 5 }}
                  variant="success"
                >
                  Publish
                </Button>
              </>
            )}
          </Container>
        ) : null}
      </Container>
    </>
  )
}

export default BookDetails
