import { validateModel } from 'models/validate'
import name from 'models/shared/name'

export const validateIdentificationName = (data) => {
  const { Name } = data
  return validateModel(Name, name) === true
}

/** LEGACY */
export default class IdentificationNameValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateIdentificationName(this.data)
  }
}
