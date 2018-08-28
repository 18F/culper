import OffenseValidator from './offense'
import { validAccordion, validBranch } from './helpers'

export default class PoliceOffensesValidator {
  constructor(data = {}) {
    this.hasOffenses = (data.HasOffenses || {}).value
    this.list = data.List || {}
  }

  validItems() {
    if (this.hasOffenses === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new OffenseValidator(item).isValid()
    })
  }

  isValid() {
    return validBranch(this.hasOffenses) && this.validItems()
  }
}
