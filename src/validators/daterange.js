import DateControlValidator from './datecontrol'

export default class DateRangeValidator {
  constructor(data = {}) {
    const now = new Date()
    this.from = data.from
    this.to = data.present
      ? {
          month: `${now.getMonth() + 1}`,
          day: `${now.getDate()}`,
          year: `${now.getFullYear()}`,
          date: now
        }
      : data.to
    this.present = data.present
  }

  /**
   * Validates the date ranges
   */
  isValid() {
    if (!new DateControlValidator(this.from || {}).validDate()) {
      return false
    }

    if (!new DateControlValidator(this.to || {}).validDate()) {
      return false
    }

    const tdate = new Date(
      `${this.to.month || ''}/${this.to.day || '1'}/${this.to.year}`
    )
    const fdate = new Date(
      `${this.from.month || ''}/${this.from.day || '1'}/${this.from.year}`
    )
    return tdate > fdate
  }
}
