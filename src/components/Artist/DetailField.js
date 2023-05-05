import { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import { UserContext } from '../../context/UserContext'
import { useDispatch } from 'react-redux'
import { updateBook } from '../../reducers/bookSlice'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

const DetailField = ({ fieldName, fieldTitle, defaultValue, bookId }) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState()
  const [width, setWidth] = useState()
  const { loggedUser } = useContext(UserContext)

  const dispatch = useDispatch()

  useEffect(() => {
    setValue(defaultValue)
    setWidth(defaultValue.length * 20)
    console.log(defaultValue, width)
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSave = async () => {
    dispatch(updateBook({ id: bookId, update: { [fieldName]: value } }))
    setEditMode(false)
  }

  const defaultView = () => (
    <Container>
      <Typography>{value}</Typography>
      {loggedUser && loggedUser.role === 'admin' ? (
        <Tooltip title="Edit">
          <IconButton onClick={() => setEditMode(true)} aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Container>
  )
  const editView = () => (
    <Container>
      <Container>
        {fieldName === 'description' ? (
          <TextField
            type="textarea"
            defaultValue={value}
            name={fieldName}
            onChange={handleChange}
            label={fieldTitle}
            multiline
            fullWidth
            variant="outlined"
          />
        ) : (
          <TextField
            type="text"
            defaultValue={value}
            name={fieldName}
            onChange={handleChange}
            variant="standard"
            label={fieldTitle}
          />
        )}
      </Container>
      <Container>
        <Tooltip title="Cancel">
          <IconButton
            onClick={() => {
              setEditMode(false)
              setValue(defaultValue)
            }}
            aria-label="cancel"
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Save">
          <IconButton onClick={handleSave} aria-label="save">
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </Container>
    </Container>
  )

  return (
    <>
      {editMode && loggedUser && loggedUser.role === 'admin'
        ? editView()
        : defaultView()}
    </>
  )
}

export default DetailField
