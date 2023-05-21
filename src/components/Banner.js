import { Box, Grid, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Stack from '@mui/joy/Stack'

import img from '../assets/banner.jpg'

const Banner = ({ header, paragraph }) => {
  return (
    <>
      <Box
        sx={{
          marginBottom: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'grey',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: 400,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'black',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 400,
            width: '100%',
            opacity: '0.5',
          }}
        >
          <Box
            sx={{
              width: '50%',
            }}
          >
            <Typography align="center" style={{ color: 'white' }} variant="h3">
              {header}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Banner
