import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import { INVALID_VALIDATOR } from 'constants/errors'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

const locationValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { validator } = options
  if (!validator) return INVALID_VALIDATOR

  const locationErrors = validateModel({
    ...value,
    country: countryString(value && value.country),
  }, validator, options)

  if (locationErrors !== true) return locationErrors

  return null
}

export default locationValidator
