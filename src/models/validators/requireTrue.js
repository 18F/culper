import { VALUE_NOT_TRUE } from 'constants/errors'

const requireTrue = (value) => {
  if (value === true) return null
  return VALUE_NOT_TRUE
}

export default requireTrue
