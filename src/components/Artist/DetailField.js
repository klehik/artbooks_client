import { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import { UserContext } from '../../context/UserContext'
import { useDispatch } from 'react-redux'
import { updateBook } from '../../reducers/bookSlice'

const DetailField = ({ fieldName, fieldTitle, defaultValue, bookId }) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState()
  const { loggedUser } = useContext(UserContext)

  const dispatch = useDispatch()

  useEffect(() => {
    setValue(defaultValue)
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSave = async () => {
    dispatch(updateBook({ id: bookId, update: { [fieldName]: value } }))
    setEditMode(false)
  }

  const defaultView = () => (
    <div
      onClick={() => {
        setEditMode(true)
      }}
    >
      {fieldTitle}: {value}
    </div>
  )

  const editView = () => (
    <div>
      <label for={fieldName}>{fieldTitle}:</label>
      {fieldName === 'description' ? (
        <textarea
          name={fieldName}
          className="form-control"
          defaultValue={value}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          name={fieldName}
          className="form-control"
          defaultValue={value}
          onChange={handleChange}
        ></input>
      )}
      <Button
        variant="dark"
        onClick={() => {
          setEditMode(false)
          setValue(defaultValue)
        }}
      >
        x
      </Button>
      <Button variant="dark" onClick={handleSave}>
        save
      </Button>
    </div>
  )

  return (
    <div>
      {editMode && loggedUser && loggedUser.role === 'admin'
        ? editView()
        : defaultView()}
    </div>
  )
}

export default DetailField
