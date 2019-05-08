import { validateModel } from 'models/validate'
import address from 'models/shared/locations/address'

// Temporary while country values are inconsistent
import { countryString } from 'validators/location'

const addressValidator = (value) => {
  const { Location } = value

  return validateModel({
    ...Location,
    country: countryString(Location && Location.country),
  }, address)
}

export default addressValidator
