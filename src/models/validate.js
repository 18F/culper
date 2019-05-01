import { validate } from 'validate.js'

validate.formatters.errorKeys = errors => (
  errors.map((e) => {
    let { validator } = e
    if (validator === 'presence') {
      validator = 'required'
    }

    return `${e.attribute}.${validator}`
  })
)

validate.validators.requireTrue = (value) => {
  if (value === true) return null

  return 'Value must be true'
}

validate.validators.ssn = (value = {}) => {
  const completeSSN = `${value.first}-${value.middle}-${value.last}`

  // Legacy system only excluded explicit values
  const invalidSSNs = [
    '999-99-9999',
    '123-45-6789',
  ]

  if (invalidSSNs.indexOf(completeSSN) > -1) return 'Invalid SSN'

  return null
}

export const validateModel = (data, model, options = {}) => {
  const defaultOptions = {
    format: 'errorKeys',
  }

  const errors = validate(data, model, { ...defaultOptions, ...options })

  console.log('validate model', data, model, errors)

  if (!errors) return true

  return errors
}

export default validateModel
