import { useContext, useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

import authService from '../../services/auth'
import { notify, useField } from '../../utils'
import { Container } from '@mui/material'

const RegisterForm = () => {
  const username = useField('text')
  const password = useField('password')
  const email = useField('text')

  const navigate = useNavigate()
  const { loggedUser, setLoggedUser } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const creds = {
      username: username.value,
      password: password.value,
      email: email.value,
    }
    const response = await authService.register(creds)
    console.log(response)
    notify(response.data.message)
    if (response.data.user) {
      const response = await authService.login(creds)
      setLoggedUser(response.data.user)
      navigate('/manage/info')
    }
    username.reset()
    password.reset()
    email.reset()
  }
  //userService.setUser(user)

  return (
    <Container style={{ marginTop: '80px' }}>
      <Row lg={4} className="align-items-center justify-content-center">
        <Form onSubmit={handleSubmit}>
          <h2>Create account</h2>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control {...username} />
            <Form.Label>email:</Form.Label>
            <Form.Control {...email} />
            <Form.Label>password:</Form.Label>
            <Form.Control {...password} />

            <Button variant="dark" type="submit">
              register
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  )
}

export default RegisterForm
