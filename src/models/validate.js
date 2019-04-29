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

export const validateModel = (data, model, options = {}) => {
  const defaultOptions = {
    format: 'errorKeys',
  }

  const errors = validate(data, model, { ...defaultOptions, ...options })

  if (!errors) return true

  return errors
}

export default validateModel
