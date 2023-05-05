import { useRef, useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const createPromise = () => {
  let resolver
  return [
    new Promise((resolve, reject) => {
      resolver = resolve
    }),
    resolver,
  ]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const set = (value) => {
    setValue(value)
  }
  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset,
    set,
  }
}

export const useConfirm = () => {
  const [open, setOpen] = useState(false)
  const [resolver, setResolver] = useState({ resolver: null })
  const [label, setLabel] = useState('')

  const confirm = async (text) => {
    setLabel(text)
    setOpen(true)
    const [promise, resolve] = await createPromise()
    setResolver({ resolve })
    return promise
  }

  const onClick = async (status) => {
    setOpen(false)
    resolver.resolve(status)
  }

  const Confirmation = () => (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClick(false)}>Cancel</Button>
          <Button onClick={() => onClick(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

  return [confirm, Confirmation]
}

export const notify = (message) => toast(message)
