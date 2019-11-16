import React from 'react'

export const useInput = ({ checkbox = false } = {}) => {
  const [value, set] = React.useState(checkbox ? false : '')
  const onChange = (evt) =>
    checkbox ? set(evt.target.checked) : set(evt.target.value)

  return { [checkbox ? 'checked' : 'value']: value, onChange }
}

export default null
