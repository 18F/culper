import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield, validGenericMonthYear } from './helpers'

export default class NegativeImpactsValidator {
  constructor (state, props) {
    this.hasImpacts = state.HasImpacts
    this.list = state.List
    this.listBranch = state.ListBranch
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
      const result = new NegativeImpactValidator(item.NegativeImpact, null).isValid()
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
  constructor (state, props) {
    this.occurred = state.Occurred
    this.circumstances = state.Circumstances
    this.negativeImpact = state.NegativeImpact
    this.used = state.Used
  }

  isValid () {
    return validGenericMonthYear(this.occurred) &&
      validGenericTextfield(this.circumstances) &&
      validGenericTextfield(this.negativeImpact) &&
      new DateRangeValidator(this.used).isValid()
  }
}
