import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import {
  MISSING_ITEMS, INVALID_VALIDATOR,
} from 'constants/errors'

/**
 * Array:
 * {
 *  values: []
 * }
 */

const arrayValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { values } = value
  if (!values) return MISSING_ITEMS

  const { validator, length } = options
  if (!validator) return INVALID_VALIDATOR

  if (length) {
    const arrayErrors = validateModel({ array: values }, { array: { length } })
    if (arrayErrors !== true) return arrayErrors
  }

  let itemsErrors = []
  for (let i = 0; i < values.length; i += 1) {
    const itemErrors = validateModel({ value: values[i] }, { value: validator })
    if (itemErrors !== true) itemsErrors = itemsErrors.concat(itemErrors)
  }

  if (itemsErrors.length) return itemsErrors

  return null
}

export default arrayValidator
