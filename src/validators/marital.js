import CivilUnionValidator from './civilunion'
import DivorceValidator from './divorce'

export default class MaritalValidator {
  constructor (state = {}, props) {
    this.civilUnion = state.CivilUnion
    this.status = state.Status
    this.divorcedList = state.DivorcedList
    this.divorcedListBranch = state.DivorcedListBranch
  }

  validStatus () {
    return ['Never', 'InCivilUnion', 'Separated', 'Annulled', 'Divorced', 'Widowed'].includes(this.status)
  }

  validDivorce () {
    if (!this.divorcedList || !this.divorcedList.length) {
      return false
    }

    if (this.divorcedListBranch !== 'No') {
      return false
    }

    for (let item of this.divorcedList) {
      if (!new DivorceValidator(item.Divorce).isValid()) {
        return false
      }
    }

    return true
  }

  isValid () {
    if (!this.validStatus()) {
      return false
    }

    let valid = true
    if (['InCivilUnion', 'Separated'].includes(this.status)) {
      valid = new CivilUnionValidator(this.civilUnion).isValid()
      if (valid && (this.civilUnion || {}).Divorced === 'Yes') {
        valid = this.validDivorce()
      }
    } else if (['Annulled', 'Divorced', 'Widowed'].includes(this.status)) {
      valid = this.validDivorce()
    }

    return valid
  }
}
