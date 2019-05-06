const requireEmpty = (value) => {
  if (value === null
    || value === undefined
    || value === ''
    || (Array.isArray(value) && value.length === 0)
    || (value.constructor === Object && Object.keys(value).length === 0)) {
    return null
  }

  return 'Value must be empty'
}

export default requireEmpty
