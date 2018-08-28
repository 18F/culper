import DateRangeValidator from './daterange'
import { validAccordion } from './helpers'

export default class GamblingValidator {
  constructor(data = {}) {
    this.hasGamblingDebt = (data.HasGamblingDebt || {}).value
    this.list = data.List || {}
  }

  validHasGamblingDebt() {
    if (!this.hasGamblingDebt) {
      return false
    }

    if (!(this.hasGamblingDebt === 'No' || this.hasGamblingDebt === 'Yes')) {
      return false
    }

    return true
  }

  /**
   * Validates all fields for a collection of gambling debt
   */
  validGamblingDebt() {
    if (this.validHasGamblingDebt() && this.hasGamblingDebt === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new GamblingItemValidator(item).isValid()
    })
  }

  /**
   * Validates section of gambling debt
   */
  isValid() {
    return this.validHasGamblingDebt() && this.validGamblingDebt()
  }
}

export class GamblingItemValidator {
  constructor(data = {}) {
    this.losses = data.Losses
    this.description = data.Description
    this.actions = data.Actions
    this.dates = data.Dates
  }

  isValid() {
    if (!this.losses || parseInt(this.losses.value) < 1) {
      return false
    }

    if (!this.description || !this.description.value) {
      return false
    }

    if (!this.actions || !this.actions.value) {
      return false
    }

    if (!new DateRangeValidator(this.dates, null).isValid()) {
      return false
    }
    return true
  }
}
