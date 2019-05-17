import { validateModel } from 'models/validate'

const arrayValidator = (value = [], options) => {
  const { validator } = options

  for (let i = 0; i < value.length; i += 1) {
    const itemErrors = validateModel({ value: value[i] }, { value: validator })
    if (itemErrors !== true) return itemErrors
  }

  return null
}

export default arrayValidator
