import CivilUnionValidator from './civilunion'
import DivorceValidator from './divorce'
import { validAccordion } from './helpers'

export default class MaritalValidator {
  constructor (state = {}, props = {}) {
    this.civilUnion = state.CivilUnion
    this.status = (state.Status || {}).value
    this.divorcedList = (state.DivorcedList || [])
  }

  validStatus () {
    return ['Never', 'Married', 'InCivilUnion', 'Separated', 'Annulled', 'Divorced', 'Widowed'].includes(this.status)
  }

  validDivorce () {
    if (!this.divorcedList || !this.divorcedList.items.length) {
      return false
    }

    return validAccordion(this.divorcedList, (item) => {
      return new DivorceValidator(item).isValid()
    })
  }

  isValid () {
    if (!this.validStatus()) {
      return false
    }

    let valid = true
    if (['Married', 'InCivilUnion', 'Separated'].includes(this.status)) {
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
