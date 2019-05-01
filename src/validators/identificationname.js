import { validateModel } from 'models/validate'
import name from 'models/shared/name'

export const validateIdentificationName = data => (
  validateModel(data, name) === true
)

export default class IdentificationNameValidator {
  constructor(data = { Name: {} }) {
    this.data = data
  }

  isValid() {
    return validateIdentificationName(this.data.Name)
  }
}
