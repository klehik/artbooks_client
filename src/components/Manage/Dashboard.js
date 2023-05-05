import { useContext, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'

import { useDispatch, useSelector } from 'react-redux'
import DashBookItem from './DashBookItem'
import { fetchDashBooks } from '../../reducers/bookSlice'

const Dashboard = () => {
  const { loggedUser } = useContext(UserContext)

  const dashBooks = useSelector((state) => state.books.dashBooks)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDashBooks())
  }, [dispatch])

  const requests = dashBooks.filter((b) => b.new)
  const books = dashBooks.filter((b) => !b.new)

  return (
    <Container style={{ marginTop: '80px' }}>
      {loggedUser ? (
        <Container>
          <Row>Your role is {loggedUser.role}</Row>
        </Container>
      ) : (
        <div>You are not logged in</div>
      )}
      {loggedUser ? (
        <>
          <Container>
            <Row>{requests.length} new book request(s)</Row>
          </Container>
          <Container>
            {requests.map((book) => (
              <DashBookItem key={book.id} book={book}></DashBookItem>
            ))}
          </Container>
          <Container>
            <Row> {books.length} books</Row>
          </Container>

          <Container>
            {books.map((book) => (
              <DashBookItem key={book.id} book={book}></DashBookItem>
            ))}
          </Container>
        </>
      ) : null}
    </Container>
  )
}

export default Dashboard
