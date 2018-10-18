import CivilUnionValidator from './civilunion'
import DivorceValidator from './divorce'
import { validAccordion } from './helpers'

export default class MaritalValidator {
  constructor(data = {}) {
    this.civilUnion = data.CivilUnion || {}
    this.status = data.Status || {}
    this.divorcedList = data.DivorcedList || {}
  }

  validStatus() {
    const statusValue = this.status.value || ''
    return [
      'NeverMarried',
      'Married',
      'Separated',
      'Annulled',
      'Divorced',
      'Widowed'
    ].includes(statusValue)
  }

  validDivorce() {
    if (!this.divorcedList.items || !this.divorcedList.items.length) {
      return false
    }

    return validAccordion(this.divorcedList, item => {
      return new DivorceValidator(item).isValid()
    })
  }

  isValid() {
    if (!this.validStatus()) {
      return false
    }

    const statusValue = this.status.value || ''
    let valid = true
    if (['Married', 'Separated'].includes(statusValue)) {
      valid = new CivilUnionValidator(this.civilUnion).isValid()
      const divorcedValue = (this.civilUnion.Divorced || {}).value
      if (valid && divorcedValue === 'Yes') {
        valid = this.validDivorce()
      }
    } else if (['Annulled', 'Divorced', 'Widowed'].includes(statusValue)) {
      valid = this.validDivorce()
    }

    return valid
  }
}
