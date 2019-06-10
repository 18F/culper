import { validate } from 'validate.js'
import { validateModel } from 'models/validate'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

const locationValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { validator } = options
  if (!validator) return 'Invalid validator'

  const locationValue = { ...value }
  if (locationValue.country) locationValue.country = countryString(locationValue.country)
  if (locationValue.state) locationValue.state = locationValue.state.toUpperCase()

  const locationErrors = validateModel(locationValue, validator, options)

  if (locationErrors !== true) return locationErrors

  return null
}

export default locationValidator
