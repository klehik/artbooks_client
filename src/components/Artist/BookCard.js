import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BookCard = React.forwardRef(({ book }, ref) => {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/books/${book.id}`)} sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="260"
          image={`${book.images[book.images.length - 1].url}`}
          alt="thumbnail"
        />
        <CardContent>
          {!book.published && (
            <Typography color="red">(Not published)</Typography>
          )}
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {book.artist}
          </Typography>
          <Typography ref={ref} variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})

export default BookCard
