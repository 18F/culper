import DateRangeValidator from './daterange'

export default class GamblingValidator {
  constructor (state, props) {
    this.hasGamblingDebt = state.HasGamblingDebt
    this.list = state.List
  }

  validHasGamblingDebt () {
    if (!this.hasGamblingDebt) {
      return false
    }

    if (this.hasGamblingDebt !== 'No' && this.hasGamblingDebt !== 'Yes') {
      return false
    }

    return true
  }

  /**
   * Validates all fields for a collection of gambling debt
   */
  validGamblingDebt () {
    if (!this.list || !this.list.length) {
      return false
    }

    for (let item of this.list) {
      if (!item.Losses || parseInt(item.Losses.value) < 1) {
        return false
      }

      if (!item.Description || !item.Description.value) {
        return false
      }

      if (!item.Actions || !item.Actions.value) {
        return false
      }

      if (!new DateRangeValidator(item.Dates, null).isValid()) {
        return false
      }
    }

    return true
  }

  /**
   * Validates section of gambling debt
   */
  isValid () {
    if (!this.validHasGamblingDebt()) {
      return false
    }
    return this.validGamblingDebt()
  }
}

