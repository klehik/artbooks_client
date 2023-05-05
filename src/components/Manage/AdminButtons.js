import { useDispatch } from 'react-redux'
import { deleteBook, updateBook } from '../../reducers/bookSlice'
import {
  DeleteBookIcon,
  UnpublishBookIcon,
  PublishBookIcon,
} from '../Icons/BookIcon'
import { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import ConfirmDialog from './ConfirmDialog'

const AdminButtons = ({ book, redirect }) => {
  const [published, setPublished] = useState()

  useEffect(() => {
    setPublished(book.published)
  }, [])

  const togglePublished = () => {
    setPublished(!published)
  }

  return (
    <>
      <Stack direction="row">
        <DeleteBookIcon book={book} redirect={redirect} />
        {published ? (
          <UnpublishBookIcon toggle={togglePublished} book={book} />
        ) : (
          <>
            <PublishBookIcon toggle={togglePublished} book={book} />
          </>
        )}
      </Stack>
    </>
  )
}

export default AdminButtons
