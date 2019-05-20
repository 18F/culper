import { validateModel } from 'models/validate'

const arrayValidator = (value, options = {}) => {
  if (!value) return null // Only validate if there's a value

  const { values } = value
  if (!values) return 'No values'

  const { validator, length } = options
  if (!validator) return 'Invalid validator'

  if (length) {
    const arrayErrors = validateModel({ array: values }, { array: { length } })
    if (arrayErrors !== true) return arrayErrors
  }

  for (let i = 0; i < values.length; i += 1) {
    const itemErrors = validateModel({ value: values[i] }, { value: validator })
    if (itemErrors !== true) return itemErrors
  }

  return null
}

export default arrayValidator
