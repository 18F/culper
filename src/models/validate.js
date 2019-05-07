import { validate } from 'validate.js'

import requireTrue from 'models/validators/requireTrue'
import requireEmpty from 'models/validators/requireEmpty'
import ssn from 'models/validators/ssn'
import zipcode from 'models/validators/zipcode'

import { isDateTime, createDateFromObject, createDateFromTimestamp } from 'helpers/date'

// Error message format
validate.formatters.errorKeys = errors => (
  errors.map((e) => {
    let { validator } = e
    if (validator === 'presence') {
      validator = 'required'
    }

    return `${e.attribute}.${validator}`
  })
)

// Date parser/formatting
validate.extend(validate.validators.datetime, {
  parse: (value) => {
    // Value is the datetime as taken in by the form
    // Return unix timestamp
    const dateTime = value && isDateTime(value)
      ? value
      : createDateFromObject(value)

    if (dateTime.isValid) {
      return dateTime.toMillis()
    }

    return NaN
  },
  format: (value) => {
    // Value is the datetime as a unix timestamp
    // Return formatted date (used in error messages)
    const dateTime = createDateFromTimestamp(value)
    return dateTime.toLocaleString()
  },
})

// Set default options/config
validate.validators.presence.options = { allowEmpty: false }
validate.options = {
  format: 'errorKeys',
  allowPOBox: true,
}

// Implement custom validators
validate.validators.requireTrue = requireTrue
validate.validators.requireEmpty = requireEmpty
validate.validators.ssn = ssn
validate.validators.zipcode = zipcode

export const validateModel = (data, model, options) => {
  const errors = options
    ? validate(data, model, options)
    : validate(data, model)

  // console.log('validate model', data, model, errors)

  if (!errors) return true

  return errors
}

export default validateModel
