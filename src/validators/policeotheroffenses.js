import OtherOffenseValidator from './otheroffense'
import { validAccordion, validBranch } from './helpers'

export default class PoliceOtherOffensesValidator {
  constructor(data = {}) {
    this.list = data.List || {}
    this.hasOtherOffenses = (data.HasOtherOffenses || {}).value
  }

  validItems() {
    if (this.hasOtherOffenses === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new OtherOffenseValidator(item).isValid()
    })
  }

  isValid() {
    return validBranch(this.hasOtherOffenses) && this.validItems()
  }
}
