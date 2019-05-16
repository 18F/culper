import { validate } from 'validate.js'

const arrayValidator = (value = [], options) => {
  const { validator } = options

  for (let i = 0; i < value.length; i += 1) {
    const itemErrors = validate({ value: value[i] }, { value: validator })
    if (itemErrors) return itemErrors
  }

  return null
}

export default arrayValidator
