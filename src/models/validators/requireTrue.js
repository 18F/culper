const requireTrue = (value) => {
  if (value === true) return null
  return 'Value must be true'
}

export default requireTrue
