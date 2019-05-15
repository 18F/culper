import { validateModel } from 'models/validate'
import address from 'models/shared/locations/address'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

const addressValidator = (value) => {
  const locationErrors = validateModel({
    ...value,
    country: countryString(value && value.country),
  }, address)

  if (locationErrors !== true) return locationErrors

  return null
}

export default addressValidator
