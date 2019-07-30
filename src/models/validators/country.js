import { validate } from 'validate.js'
import { countryValues } from 'constants/enums/countries'
import { INVALID_COUNTRY } from 'constants/errors'

const countryValidator = (value) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  // array
  if (value.value
    && value.value.length
    && value.value.every
    && value.value.every(i => countryValues.indexOf(i) > -1)) {
    return null
  }

  // obj
  if (value.value && countryValues.indexOf(value.value) > -1) return null

  // string
  if (countryValues.indexOf(value) > -1) return null

  return INVALID_COUNTRY
}

export default countryValidator
