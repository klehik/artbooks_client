import { Container, Box } from '@mui/material'
const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        bottom: 0,
        width: '100%',
        height: 400,
        margin: 'auto',
        backgroundColor: 'black',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></Box>
  )
}

export default Footer
