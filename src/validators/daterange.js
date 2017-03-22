export default class DateRangeValidator {
  constructor (state = {}, props = {}) {
    this.from = state.from
    this.to = state.present ? { date: new Date() } : state.to
    this.present = state.present
  }

  /**
   * Validates the date ranges
   */
  isValid () {
    if (!this.from || !this.from.date) {
      return false
    }

    if (!this.to || !this.to.date) {
      return false
    }

    if (this.to.date < this.from.date) {
      return false
    }

    return true
  }
}
