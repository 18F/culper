import CivilUnionValidator from './civilunion'

export default class MaritalValidator {
  constructor (state = {}, props) {
    this.civilUnion = state.CivilUnion
    this.status = state.Status
  }

  validStatus () {
    return ['Never', 'InCivilUnion', 'Separated', 'Annulled', 'Divorced', 'Widowed'].includes(this.status)
  }

  isValid () {
    if (!this.validStatus()) {
      return false
    }

    if (!['InCivilUnion', 'Separated'].includes(this.status)) {
      return true
    }

    return new CivilUnionValidator(this.civilUnion).isValid()
  }
}
