import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield, validGenericMonthYear } from './helpers'

export default class NegativeImpactsValidator {
  constructor (data = {}) {
    this.hasImpacts = data.HasImpacts
    this.list = data.List
    this.listBranch = data.ListBranch
  }

  validHasImpacts () {
    return validBranch(this.hasImpacts)
  }

  validNegativeImpacts () {
    if (this.validHasImpacts() && this.hasImpacts === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new NegativeImpactValidator(item.Item).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasImpacts() &&
      this.validNegativeImpacts()
  }
}

export class NegativeImpactValidator {
  constructor (data = {}) {
    this.occurred = data.Occurred
    this.circumstances = data.Circumstances
    this.negativeImpact = data.NegativeImpact
    this.used = data.Used
  }

  isValid () {
    return validGenericMonthYear(this.occurred) &&
      validGenericTextfield(this.circumstances) &&
      validGenericTextfield(this.negativeImpact) &&
      new DateRangeValidator(this.used).isValid()
  }
}
