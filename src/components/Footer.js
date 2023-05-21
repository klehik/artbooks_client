import { Container, Box, Typography } from '@mui/material'
const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        bottom: 0,
        width: '100%',
        height: 250,
        margin: 'auto',
        backgroundColor: 'black',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Typography>Artbooks</Typography>
    </Box>
  )
}

export default Footer
