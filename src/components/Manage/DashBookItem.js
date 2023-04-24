import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import AdminButtons from './AdminButtons'

const DashBookItem = ({ book }) => {
  const navigate = useNavigate()

  const { loggedUser } = useContext(UserContext)

  return (
    <Container style={{ border: '2px solid beige' }}>
      <Row className="justify-content-center">
        <Col>Artist: {book.artist}</Col>
        <Col>Title: {book.title}</Col>
        <Col>
          Uploaded by{' '}
          {book.user.id === loggedUser.id ? 'you' : book.user.username}
        </Col>

        <Col>
          <Button
            onClick={() => navigate(`/books/${book.id}`)}
            style={{ margin: 5 }}
            variant="dark"
          >
            Preview
          </Button>
          {loggedUser && loggedUser.role === 'admin' ? (
            <AdminButtons book={book}></AdminButtons>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default DashBookItem
