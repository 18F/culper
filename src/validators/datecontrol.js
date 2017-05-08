export default class DateControlValidator {
  constructor (state = {}, props = {}) {
    this.month = state.month
    this.day = state.day
    this.year = state.year
    this.maxDate = props.maxDate
    this.minDate = props.minDate
    this.hideDay = props.hideDay
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

    const date = new Date(`${this.month}/${this.day}/${this.year}`)
    // For month/year fields, we compare from the start of the month
    if (this.hideDay) {
      return date >= new Date(`${this.minDate.getMonth() + 1}/1/${this.minDate.getFullYear()}`)
    }
    return (new Date(`${this.month}/${this.day}/${this.year}`) >= this.minDate)
  }
}
