import AddressValidator from './address'
import { validGenericTextfield, validGenericMonthYear, BranchCollection } from './helpers'

export default class DomesticViolence {
  constructor (state = {}, props = {}) {
    this.list = state.List || []
  }

  isValid () {
    if (!this.list) {
      return false
    }

    const branchValidator = new BranchCollection(this.list)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return new DomesticViolenceItem(item.domestic).isValid()
    })
  }
}

export class DomesticViolenceItem {
  constructor (state = {}) {
    this.courtAddress = state.CourtAddress
    this.courtName = state.CourtName
    this.explanation = state.Explanation
    this.issued = state.Issued
  }

  isValid () {
    return new AddressValidator(this.courtAddress).isValid() &&
      validGenericTextfield(this.courtName) &&
      validGenericTextfield(this.explanation) &&
      validGenericMonthYear(this.issued)
  }
}
