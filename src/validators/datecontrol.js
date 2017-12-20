import { today, daysAgo } from '../components/Section/History/dateranges'

export default class DateControlValidator {
  constructor (state = {}, props = {}) {
    this.month = state.month || props.month
    this.day = state.day || props.day
    this.year = state.year || props.year
    this.hideDay = props.hideDay
    this.noMaxDate = props.noMaxDate
    this.relationship = props.relationship || ''

    this.limits = dateLimits(this.relationship, props.applicantBirthdate)
    this.maxDate = props.maxDate || this.limits.maxDate
    this.minDate = props.minDate || this.limits.minDate

    // For month/year fields, we compare from the start of the month
    if (this.hideDay) {
      this.maxDate = new Date(`${this.maxDate.getMonth() + 1}/1/${this.maxDate.getFullYear()}`)
      this.minDate = new Date(`${this.minDate.getMonth() + 1}/1/${this.minDate.getFullYear()}`)
    }
  }

  validMaxDate () {
    // If no max day present, we return true to continue as we have nothing
    // to compare against
    if (!this.maxDate || this.noMaxDate) {
      return true
    }

    if (!this.month || !this.day || !this.year) {
      return false
    }

    const date = new Date(`${this.month}/${this.day}/${this.year}`)
    return date <= this.maxDate
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
    return date >= this.minDate
  }

  isValid () {
    if ((!this.day && !this.hideDay) || !this.month || !this.year) {
      return false
    }

    return true
  }
}

const extractDate = (dateObj) => {
  if (dateObj instanceof Date) {
    return dateObj
  }

  if (!dateObj || !dateObj.month || !dateObj.day || !dateObj.year) {
    return null
  }

  return new Date(`${dateObj.month}/${dateObj.day}/${dateObj.year}`)
}

export const dateLimits = (relationship, birthdate) => {
  let max = new Date()
  let min = extractDate(birthdate)

  switch (relationship) {
  case 'Self':
    max = daysAgo(today, 365 * 16)
    min = daysAgo(today, 365 * 130)
    break
  case 'Mother':
  case 'Father':
    max = min
    min = daysAgo(today, 365 * 200)
    break
  case 'Child':
    break
  case 'Stepmother':
  case 'Stepfather':
  case 'Fosterparent':
  case 'Stepchild':
  case 'Brother':
  case 'Sister':
  case 'Stepbrother':
  case 'Stepsister':
  case 'Half-brother':
  case 'Half-sister':
  case 'Father-in-law':
  case 'Monther-in-law':
  case 'Guardian':
  case 'Other':
    min = daysAgo(today, 365 * 200)
    break
  default:
    // Everything else just uses the defaults
    if (!min) {
      min = daysAgo(today, 365 * 200)
    }
  }

  return { minDate: min, maxDate: max }
}
