import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import AdminButtons from './AdminButtons'
import { IconButton, Tooltip, Stack, Typography } from '@mui/material'

const DashBookItem = ({ book }) => {
  const navigate = useNavigate()

  const { loggedUser } = useContext(UserContext)

  const StatusText = () => {
    const newBookText = book.new ? '(New)' : ''

    return book.published ? (
      <Typography color="green">Published{newBookText}</Typography>
    ) : (
      <Typography color="red">Not published {newBookText}</Typography>
    )
  }

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
          <StatusText></StatusText>
        </Col>

        <Col>
          <Stack direction="row">
            {loggedUser && loggedUser.role === 'admin' ? (
              <AdminButtons book={book}></AdminButtons>
            ) : null}
            <Tooltip title="preview">
              <IconButton onClick={() => navigate(`/books/${book.id}`)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default DashBookItem
