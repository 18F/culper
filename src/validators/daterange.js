import DateControlValidator from './datecontrol'
import { extractDate } from '../components/Section/History/dateranges'

export default class DateRangeValidator {
  constructor(data = {}) {
    const now = new Date()
    this.from = data.from
    this.to = data.present
      ? {
          month: `${now.getMonth() + 1}`,
          day: `${now.getDate()}`,
          year: `${now.getFullYear()}`
        }
      : data.to
    this.present = data.present
  }

  hasNotBeenTouched(date) {
    return date && date.touched !== undefined && date.touched !== null && !date.touched
  }

  /**
   * Validates the date ranges
   */
  isValid() {
    if (this.hasNotBeenTouched(this.from) || this.hasNotBeenTouched(this.to)) {
      return true
    }

    if (!new DateControlValidator(this.from).validDate()) {
      return false
    }

    if (!new DateControlValidator(this.to).validDate()) {
      return false
    }

    return extractDate(this.to) >= extractDate(this.from)
  }
}
