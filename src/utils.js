import { useRef, useState } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export const notify = (message) => toast(message)
