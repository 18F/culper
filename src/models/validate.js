import { validate } from 'validate.js'

import requireTrue from 'models/validators/requireTrue'
import requireEmpty from 'models/validators/requireEmpty'
import ssn from 'models/validators/ssn'

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

// Set default options/config
validate.validators.presence.options = { allowEmpty: false }
validate.options = { format: 'errorKeys' }

// Implement custom validators
validate.validators.requireTrue = requireTrue
validate.validators.requireEmpty = requireEmpty
validate.validators.ssn = ssn

export const validateModel = (data, model, options) => {
  const errors = options
    ? validate(data, model, options)
    : validate(data, model)

  // console.log('validate model', data, model, errors)

  if (!errors) return true

  return errors
}

export default validateModel
