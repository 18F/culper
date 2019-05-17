/** Replacing src/validators/helpers.js validGenericTextField */

const hasValueValidator = (value) => {
  if (!value || !value.value) {
    return 'Invalid value'
  }

  return null
}

export default hasValueValidator
