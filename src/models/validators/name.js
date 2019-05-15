import { validateModel } from 'models/validate'
import name from 'models/shared/name'

const nameValidator = (value) => {
  const nameErrors = validateModel(value, name)

  if (nameErrors !== true) return nameErrors

  return null
}

export default nameValidator
