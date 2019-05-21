/** Replacing src/validators/helpers.js validGenericTextField */
import { validateModel } from 'models/validate'

const hasValueValidator = (value, options) => {
  if (!value || !value.value) {
    return 'Invalid value'
  }

  if (options && options.validator) {
    const valueErrors = validateModel(value, { value: options.validator })
    if (valueErrors !== true) return valueErrors
  }

  return null
}

export default hasValueValidator
