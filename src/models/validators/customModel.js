import { validateModel } from 'models/validate'

const customModelValidator = (value, options = {}) => {
  const { validator } = options

  if (!validator) return 'Invalid validator'

  const errors = validateModel(value, validator, options)
  if (errors !== true) return errors

  return null
}

export default customModelValidator
