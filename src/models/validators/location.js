import { validateModel } from 'models/validate'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

const locationValidator = (value, options = {}) => {
  const { validator } = options
  if (!validator) return 'Invalid validator'

  const locationErrors = validateModel({
    ...value,
    country: countryString(value && value.country),
  }, validator, options)

  if (locationErrors !== true) return locationErrors

  return null
}

export default locationValidator
