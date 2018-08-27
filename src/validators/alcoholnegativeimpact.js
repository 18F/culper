import DateRangeValidator from './daterange'
import {
  validAccordion,
  validBranch,
  validGenericTextfield,
  validGenericMonthYear
} from './helpers'

export default class NegativeImpactsValidator {
  constructor(data = {}) {
    this.hasImpacts = (data.HasImpacts || {}).value
    this.list = data.List || {}
  }

  validHasImpacts() {
    return validBranch(this.hasImpacts)
  }

  validNegativeImpacts() {
    if (this.validHasImpacts() && this.hasImpacts === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new NegativeImpactValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasImpacts() && this.validNegativeImpacts()
  }
}

export class NegativeImpactValidator {
  constructor(data = {}) {
    this.occurred = data.Occurred
    this.circumstances = data.Circumstances
    this.negativeImpact = data.NegativeImpact
    this.used = data.Used
  }

  isValid() {
    return (
      validGenericMonthYear(this.occurred) &&
      validGenericTextfield(this.circumstances) &&
      validGenericTextfield(this.negativeImpact) &&
      new DateRangeValidator(this.used).isValid()
    )
  }
}
