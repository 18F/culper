import { validate } from 'validate.js'
import { validateModel } from 'models/validate'

const arrayValidator = (value, options, key, attributes, globalOptions) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { values } = value
  if (!values) return 'No values'

  const { validator, length } = options
  if (!validator) return 'Invalid validator'

  if (length) {
    const arrayErrors = validateModel(
      { array: values },
      { array: { length } },
      { ...globalOptions }
    )
    if (arrayErrors !== true) return arrayErrors
  }

  for (let i = 0; i < values.length; i += 1) {
    const itemErrors = validateModel(
      { value: values[i] },
      { value: validator },
      { ...globalOptions, ...options }
    )
    if (itemErrors !== true) return itemErrors
  }

  return null
}

export default arrayValidator
