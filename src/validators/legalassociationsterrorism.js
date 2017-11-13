import { validGenericTextfield } from './helpers'

export default class LegalAssociationTerrorismValidator {
  constructor (state = {}, props = {}) {
    this.hasTerrorism = (props.HasTerrorism || {}).value
    this.explanation = props.Explanation
  }

  isValid () {
    if (this.hasTerrorism === 'No') {
      return true
    }

    if (this.hasTerrorism === 'Yes') {
      return !!this.explanation && validGenericTextfield(this.explanation)
    }

    return false
  }
}
