import { useState } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'

import { addBook } from '../../reducers/bookSlice'
import { useDispatch } from 'react-redux'
import { Container } from '@mui/material'
const { useField, notify } = require('../../utils')

const BookForm = () => {
  const title = useField('text')
  const artist = useField('text')
  const graphicDesigner = useField('text')
  const writer = useField('text')
  const publisher = useField('text')
  const date = useField('text')
  const pageCount = useField('text')
  const dimensions = useField('text')
  const language = useField('text')
  const website = useField('text')
  const description = useField('textarea')

  const [images, setImages] = useState([])
  const form = [title, artist, graphicDesigner, writer, description]

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    notify('Submitting...')
    event.preventDefault()

    const formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i].data)
    }

    const bookData = {
      title: title.value,
      artist: artist.value,
      graphicDesigner: graphicDesigner.value,
      writer: writer.value,
      description: description.value,
    }

    for (const key in bookData) {
      formData.append(key, bookData[key])
    }
    console.log(formData)

    dispatch(addBook(formData))

    /* form.forEach((element) => {
      element.reset()
    }) */
  }

  const handleReset = () => {
    form.forEach((element) => {
      console.log(element)
      element.reset()
    })
    setImages([])
  }

  const handleChange = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    }
    setImages(images.concat(img))
  }

  const handleRemove = (img) => {
    setImages(images.filter((i) => i.preview !== img.preview))
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <Form onSubmit={handleSubmit}>
        <Row className="container mt-3 mb-3">
          <h2>Submit Book Request</h2>
          <Col>
            <Form.Label>Title</Form.Label>
            <Form.Control {...title} />
          </Col>
          <Col>
            <Form.Label>Artist</Form.Label>
            <Form.Control {...artist} />
          </Col>
        </Row>
        <Row className="container mt-3 mb-3">
          <Col>
            <Form.Label>Graphic Designer</Form.Label>
            <Form.Control {...graphicDesigner} />
          </Col>
          <Col>
            <Form.Label>Writer</Form.Label>
            <Form.Control {...writer} />
          </Col>
        </Row>
        <Row className="container mt-3 mb-3">
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" {...description} />
            <Form.Label>Images</Form.Label>
            <Form.Control type="file" onChange={handleChange} />
          </Col>
        </Row>
        <Row xs={1} sm={2} md={3} xl={3} className="g-4 m-4 ">
          {images &&
            images.map((img) => (
              <>
                <Col>
                  <Container>
                    <div>{img.data.name}</div>
                    <div>
                      <Button
                        style={{ margin: 5 }}
                        variant="dark"
                        onClick={() => handleRemove(img)}
                      >
                        Delete
                      </Button>
                    </div>
                    <Image
                      thumbnail={true}
                      width={250}
                      src={img.preview}
                    ></Image>
                  </Container>
                </Col>
              </>
            ))}
        </Row>

        <Row className="container mt-3 mb-3">
          <Col>
            <Button style={{ margin: 5 }} variant="dark" type="submit">
              Submit
            </Button>
            <Button style={{ margin: 5 }} variant="dark" onClick={handleReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default BookForm
