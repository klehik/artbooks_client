import { useDispatch } from 'react-redux'
import { deleteBook, updateBook } from '../../reducers/bookSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import PublishIcon from '@mui/icons-material/Publish'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '../Manage/ConfirmDialog'
import { useState } from 'react'
import { useConfirm } from '../../utils'

export const DeleteBookIcon = ({ book, redirect }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirm, Confirmation] = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm(
      `Are you sure you want to delete book: ${book.title}`
    )
    if (confirmed) {
      dispatch(deleteBook(book.id))
      if (redirect) {
        navigate('/books')
      }
    }
  }
  return (
    <>
      <Confirmation />
      <Tooltip title="delete">
        <IconButton onClick={handleDelete} aria-label="delete" role="alert">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export const UnpublishBookIcon = ({ toggle, book }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirm, Confirmation] = useConfirm()

  const handleUnpublish = async () => {
    const confirmed = await confirm(
      `Are you sure you want unpublish ${book.title}`
    )
    if (confirmed) {
      dispatch(updateBook({ id: book.id, update: { published: false } }))
      toggle()
    }
  }

  return (
    <>
      <Confirmation />
      <Tooltip title="Unpublish">
        <IconButton onClick={handleUnpublish} aria-label="unpublish">
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export const PublishBookIcon = ({ toggle, book }) => {
  const dispatch = useDispatch()
  const [confirm, Confirmation] = useConfirm()

  const handlepublish = async () => {
    const confirmed = await confirm(
      `Are you sure you want publish ${book.title}`
    )
    if (confirmed) {
      dispatch(
        updateBook({
          id: book.id,
          update: { published: true, new: false },
        })
      )
      toggle()
    }
  }
  return (
    <>
      <Confirmation />
      <Tooltip title="Publish">
        <IconButton onClick={handlepublish} aria-label="publish">
          <PublishIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}
