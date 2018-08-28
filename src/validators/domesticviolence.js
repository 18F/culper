import LocationValidator from './location'
import {
  validGenericTextfield,
  validGenericMonthYear,
  validBranch,
  validAccordion
} from './helpers'

export default class DomesticViolence {
  constructor(data = {}) {
    this.hasDomesticViolence = (data.HasDomesticViolence || {}).value
    this.list = data.List || []
  }

  validItems() {
    if (this.hasDomesticViolence === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DomesticViolenceItem(item).isValid()
    })
  }

  isValid() {
    return validBranch(this.hasDomesticViolence) && this.validItems()
  }
}

export class DomesticViolenceItem {
  constructor(data = {}) {
    this.courtAddress = data.CourtAddress
    this.courtName = data.CourtName
    this.explanation = data.Explanation
    this.issued = data.Issued
  }

  isValid() {
    return (
      new LocationValidator(this.courtAddress).isValid() &&
      validGenericTextfield(this.courtName) &&
      validGenericTextfield(this.explanation) &&
      validGenericMonthYear(this.issued)
    )
  }
}
