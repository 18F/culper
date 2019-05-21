import { validateModel } from 'models/validate'

const customModelValidator = (value, options = {}) => {
  if (!value) return null // Only validate if there's a value

  const { validator } = options
  if (!validator) return 'Invalid validator'

  const errors = validateModel(value, validator, options)
  if (errors !== true) return errors

  return null
}

export default customModelValidator
