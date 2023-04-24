import { Col, Card } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import userIcon from '../../assets/user-icon.png'
const LoadingCard = () => {
  return (
    <Col id="books">
      <Card>
        <Skeleton count={4}></Skeleton>
        <Card.Body>
          <Skeleton count={4}></Skeleton>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default LoadingCard
