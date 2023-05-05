import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
  ListItemAvatar,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchBooks } from '../../reducers/searchBookSlice'
import { useNavigate } from 'react-router-dom'

const SearchField = ({}) => {
  const myRef = useRef(null)
  const [search, setSearch] = useState('')
  const books = useSelector((state) => state.searchBooks.books)
  const searchStatus = useSelector((state) => state.searchBooks.status)
  const dispatch = useDispatch()
  const abortControllerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (search) {
      abortControllerRef.current = new AbortController()

      dispatch(
        fetchSearchBooks({
          query: { page: 1, limit: 500, search: search },
          signal: abortControllerRef.current.signal,
        })
      )
    }
    return () => {
      handleCancel()
    }
  }, [search])

  const handleCancel = useCallback(() => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
  }, [])

  return (
    <>
      <Stack
        sx={{
          margin: 'auto',
          marginBottom: 4,
          width: '50%',
          position: 'relative',
        }}
      >
        <Typography>Search collection</Typography>
        <TextField
          inputRef={myRef}
          type="search"
          value={search}
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        />

        {search ? (
          <Paper
            style={{
              maxHeight: 200,
              width: '100%',
              overflow: 'auto',
              position: 'absolute',
              top: '100%',
              zIndex: 1,
            }}
          >
            <List dense={true}>
              {searchStatus === 'loading' ? (
                <ListItemText>Searching..</ListItemText>
              ) : (
                <>
                  {books.length > 0 ? (
                    books.map((book) => (
                      <ListItemButton
                        key={book.id}
                        onClick={() => navigate(`./${book.id}`)}
                      >
                        <ListItemText>
                          {book.artist} - {book.title}
                        </ListItemText>
                      </ListItemButton>
                    ))
                  ) : (
                    <ListItemButton>
                      <ListItemText>No results</ListItemText>
                    </ListItemButton>
                  )}
                </>
              )}
            </List>
          </Paper>
        ) : null}
      </Stack>
    </>
  )
}

export default SearchField
