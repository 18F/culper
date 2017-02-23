export default class DateRangeValidator {
  constructor (state, props) {
    this.from = state.from
    this.to = state.to
    this.present = state.present
  }

  /**
   * Validates the date ranges
   */
  isValid () {
    if (!this.from) {
      return false
    }

    if (!this.to && !this.present) {
      return false
    }

    if (this.to < this.from) {
      return false
    }

    return true
  }
}
