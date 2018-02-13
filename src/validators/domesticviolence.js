import LocationValidator from './location'
import { validGenericTextfield, validGenericMonthYear, BranchCollection } from './helpers'

export default class DomesticViolence {
  constructor (data = {}) {
    this.list = data.List || []
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
  constructor (data = {}) {
    this.courtAddress = data.CourtAddress
    this.courtName = data.CourtName
    this.explanation = data.Explanation
    this.issued = data.Issued
  }

  isValid () {
    return new LocationValidator(this.courtAddress).isValid() &&
      validGenericTextfield(this.courtName) &&
      validGenericTextfield(this.explanation) &&
      validGenericMonthYear(this.issued)
  }
}
