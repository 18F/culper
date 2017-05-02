export default class DateControlValidator {
  constructor (state = {}, props = {}) {
    this.month = state.month
    this.day = state.day
    this.year = state.year
    this.maxDate = props.maxDate
    this.minDate = props.minDate
  }

  validMaxDate () {
    // If no max day present, we return true to continue as we have nothing
    // to compare against
    if (!this.maxDate) {
      return true
    }

    if (!this.month || !this.day || !this.year) {
      return false
    }

    return (new Date(`${this.month}/${this.day}/${this.year}`) <= this.maxDate)
  }

  validMinDate () {
    // If no max day present, we return true to continue as we have nothing
    // to compare against
    if (!this.minDate) {
      return true
    }

    if (!this.month || !this.day || !this.year) {
      return false
    }

    return (new Date(`${this.month}/${this.day}/${this.year}`) >= this.minDate)
  }
}
