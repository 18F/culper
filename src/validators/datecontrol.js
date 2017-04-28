export default class DateControlValidator {
  constructor (state = {}, props = {}) {
    this.month = state.month
    this.day = state.day
    this.year = state.year
    this.maxDate = props.maxDate
  }

  validMaxDate () {
    if (!this.maxDate) {
      return true
    }
    return (new Date(`${this.month}/${this.day}/${this.year}`) <= this.maxDate)
  }

  hasErrors (error) {
    return (this.hasMonthError(error) || this.hasYearError(error) || this.hasDayError(error))
  }

  hasMonthError (error) {
    return !!error && !!error.month
  }

  hasDayError (error) {
    return !!error && !!error.day
  }

  hasYearError (error) {
    return !!error && !!error.year
  }
}
