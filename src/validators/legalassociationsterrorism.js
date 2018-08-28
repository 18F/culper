import { validGenericTextfield } from './helpers'

export default class LegalAssociationTerrorismValidator {
  constructor(data = {}) {
    this.hasTerrorism = (data.HasTerrorism || {}).value
    this.explanation = data.Explanation
  }

  isValid() {
    if (this.hasTerrorism === 'No') {
      return true
    }

    if (this.hasTerrorism === 'Yes') {
      return !!this.explanation && validGenericTextfield(this.explanation)
    }

    return false
  }
}
