import { useContext } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import loginService from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { notify, useField } from '../../utils'
import { resetState } from '../../reducers/bookSlice'
import { useDispatch } from 'react-redux'
import { Container } from '@mui/material'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const { loggeduser, setLoggedUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const creds = { username: username.value, password: password.value }
    const response = await loginService.login(creds)

    if (response.data.user) {
      setLoggedUser(response.data.user)
      notify(response.data.message)

      navigate('/manage/dashboard')
    } else {
      notify(response.data)
      username.reset()
      password.reset()
    }
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <Row lg={4} className="align-items-center justify-content-center">
        <Form onSubmit={handleLogin}>
          <h2>Log in</h2>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control {...username} />
            <Form.Label>password:</Form.Label>
            <Form.Control {...password} />
            <Button variant="dark" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  )
}

export default LoginForm
