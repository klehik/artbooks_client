import { useDispatch } from 'react-redux'
import { deleteBook, updateBook } from '../../reducers/bookSlice'
import { Button } from 'react-bootstrap'

const AdminButtons = ({ book }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Button
        onClick={() => dispatch(deleteBook(book.id))}
        style={{ margin: 5 }}
        variant="dark"
      >
        Delete
      </Button>
      {book.published ? (
        <Button
          onClick={() => {
            dispatch(updateBook({ id: book.id, update: { published: false } }))
          }}
          style={{ margin: 5 }}
          variant="danger"
        >
          Unpublish
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              dispatch(
                updateBook({
                  id: book.id,
                  update: { published: true, new: false },
                })
              )
            }}
            style={{ margin: 5 }}
            variant="success"
          >
            Publish
          </Button>
        </>
      )}
    </>
  )
}

export default AdminButtons
