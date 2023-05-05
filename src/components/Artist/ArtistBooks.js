import { Box, Container, Grid, Typography } from '@mui/material'
import BookCard from './BookCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../../reducers/bookSlice'
import { useEffect } from 'react'
import Banner from '../Banner'

const ArtistBooks = ({ artist }) => {
  return (
    <>
      <Banner header={artist.username}></Banner>

      <Container style={{ marginTop: '80px' }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {artist.books.length > 0 ? (
            artist.books.map((book, index) => (
              <Grid key={book.id} item xs={12} sm={6} md={6}>
                {index === artist.books.length - 1 ? (
                  <>
                    <BookCard book={book}></BookCard>
                  </>
                ) : (
                  <BookCard book={book}></BookCard>
                )}
              </Grid>
            ))
          ) : (
            <Typography>This artist has not uploaded any books</Typography>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default ArtistBooks
