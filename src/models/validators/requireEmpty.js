import { VALUE_NOT_EMPTY } from 'constants/errors'

const requireEmpty = (value) => {
  if (value === null
    || value === undefined
    || value === ''
    || (Array.isArray(value) && value.length === 0)
    || (value.constructor === Object && Object.keys(value).length === 0)) {
    return null
  }

  return VALUE_NOT_EMPTY
}

export default requireEmpty
