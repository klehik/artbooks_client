import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Book from './Book'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import LoadingCard from './LoadingCard'
import { useDispatch, useSelector } from 'react-redux'
import bookService from '../../services/book'

import BookCard from './BookCard'
import { Box, ButtonBase, Grid } from '@mui/material'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Banner from '../Banner'
import { useMatch } from 'react-router-dom'
import {
  fetchBookTitles,
  fetchBooks,
  incrementPage,
  resetState,
} from '../../reducers/bookSlice'
import SearchField from './SearchField'

const Books = () => {
  const books = useSelector((state) => state.books.books)

  const page = useSelector((state) => state.books.page)
  const hasMorePages = useSelector((state) => state.books.hasMorePages)
  const status = useSelector((state) => state.books.status)

  const observer = useRef()
  const dispatch = useDispatch()

  const lastElementRef = useCallback((node) => {
    if (status === 'loading') return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePages) {
        dispatch(incrementPage())
      }
    })
    if (node) observer.current.observe(node)
  })

  useEffect(() => {
    dispatch(
      fetchBooks({
        query: { page: page, limit: 4, search: '' },
      })
    )
  }, [page])

  return (
    <>
      <Banner header={'Books'}></Banner>
      <Container maxWidth="md">
        <SearchField></SearchField>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {books.map((book, index) => (
            <Grid key={book.id} item xs={12} sm={6} md={6}>
              {index === books.length - 1 ? (
                <>
                  <BookCard book={book} ref={lastElementRef}></BookCard>
                </>
              ) : (
                <BookCard book={book}></BookCard>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Books
