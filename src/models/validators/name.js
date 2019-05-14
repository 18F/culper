import { validateModel } from 'models/validate'
import name from 'models/shared/name'

const nameValidator = (value = {}) => {
  const { Name } = value

  const nameErrors = validateModel(Name, name)

  if (nameErrors !== true) return nameErrors

  return null
}

export default nameValidator
