import ForeignBenefitValidator from './foreignbenefit'
import { validAccordion, validBranch } from './helpers'

export default class ForeignBenefitActivityValidator {
  constructor(data = {}) {
    data = data || {}
    this.hasBenefits = (data.HasBenefits || {}).value
    this.list = data.List || {}
  }

  isValid() {
    if (!validBranch(this.hasBenefits)) {
      return false
    }
    if (this.hasBenefits === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ForeignBenefitValidator(item).isValid()
    })
  }
}
