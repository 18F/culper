import { validateModel } from 'models/validate'
import terrorism from 'models/terrorism'

export const validateLegalAssociationTerrorism = (data, formType, options = {}) => (
  validateModel(data, terrorism, options)
)

export default class LegalAssociationTerrorismValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalAssociationTerrorism(this.data) === true
  }
}
