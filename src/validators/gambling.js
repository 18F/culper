import DateRangeValidator from './daterange'

export default class GamblingValidator {
  constructor (data = {}) {
    this.hasGamblingDebt = data.HasGamblingDebt
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validHasGamblingDebt () {
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
  validGamblingDebt () {
    if (this.validHasGamblingDebt() && this.hasGamblingDebt === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      if (!new GamblingItemValidator(item.Item).isValid()) {
        return false
      }
    }

    return true
  }

  /**
   * Validates section of gambling debt
   */
  isValid () {
    return this.validHasGamblingDebt() &&
      this.validGamblingDebt()
  }
}

export class GamblingItemValidator {
  constructor (data = {}) {
    this.losses = data.Losses
    this.description = data.Description
    this.actions = data.Actions
    this.dates = data.Dates
  }

  isValid () {
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
