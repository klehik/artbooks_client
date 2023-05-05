import { useNavigate } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import userIcon from '../../assets/user-icon.png'
import Banner from '../Banner'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchArtists } from '../../reducers/artistSlice'

const Artists = ({ artists }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArtists())
  }, [])

  return (
    <>
      <Banner header={'Artists'}></Banner>
      <Row xs={1} sm={2} md={3} xl={4} className="g-4 m-4 ">
        {artists &&
          artists.map((artist) => (
            <Col key={artist.id} id="books">
              <Card
                onClick={() => navigate(`/artists/${artist.id}`)}
                style={{ width: '18rem' }}
              >
                <Card.Img variant="top" src={userIcon} />
                <Card.Body>
                  <Card.Title>{artist.username}</Card.Title>
                  <Card.Text>{artist.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  )
}

export default Artists
