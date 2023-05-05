import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import userIcon from '../../assets/user-icon.png'
import { CardActionArea, CardContent } from '@mui/material'

const LoadingCard = () => {
  return (
    <>
      <Card sx={{ maxWidth: 600 }}>
        <CardActionArea>
          <Skeleton
            sx={{ height: 260 }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent>
            <Skeleton height={30}></Skeleton>
            <Skeleton height={30}></Skeleton>
            <Skeleton height={30}></Skeleton>
            <Skeleton height={30}></Skeleton>
            <Skeleton height={30}></Skeleton>
            <Skeleton height={30}></Skeleton>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default LoadingCard
