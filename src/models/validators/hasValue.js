/** Replacing src/validators/helpers.js validGenericTextField */
import { validateModel } from 'models/validate'
import { MISSING_VALUE } from 'constants/errors'

const hasValueValidator = (value, options, key, attributes, globalOptions) => {
  if (!value || !value.value) {
    return MISSING_VALUE
  }

  if (options && options.validator) {
    const valueErrors = validateModel(value, { value: options.validator },
      { ...globalOptions, ...options })
    if (valueErrors !== true) return valueErrors
  }

  return null
}

export default hasValueValidator
