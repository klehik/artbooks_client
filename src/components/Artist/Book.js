import React, { forwardRef, useContext, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { notify } from '../../utils'
import Books from './Books'

const Book = React.forwardRef(({ book }, ref) => {
  const navigate = useNavigate()

  return (
    <Col id="books">
      <Card
        onClick={() => navigate(`/books/${book.id}`)}
        
      >
        <Card.Img
          variant="top"
          src={`${book.images[book.images.length - 1].url}`}
        />
        <Card.Body>
          {!book.published && <Card.Text>(Not published)</Card.Text>}
          <Card.Title>{book.title}</Card.Title>
          <Card.Text ref={ref}>{book.artist}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
})

export default Book
