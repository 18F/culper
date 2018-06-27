import store from '../services/store'
import { extractApplicantBirthdate } from '../components/Section/extractors'
import { extractDate, today, daysAgo } from '../components/Section/History/dateranges'

export const getContext = () => {
  const state = store.getState()
  const app = state.application || {}
  return {
    applicantBirthdate: extractApplicantBirthdate(app)
  }
}

export default class DateControlValidator {
  constructor (data = {}, context = null) {
    this.month = data.month
    this.day = data.day
    this.year = data.year
    this.hideDay = data.hideDay
    this.maxDate = data.maxDate
    this.minDate = data.minDate
    this.noMaxDate = data.noMaxDate
    this.relationship = data.relationship || ''
    context = context || getContext()

    this.limits = dateLimits(this.relationship, context.applicantBirthdate)
    if (!this.maxDate || (this.maxDate && this.maxDate > this.limits.maxDate)) {
      this.maxDate = this.limits.maxDate
    }

    if (!this.minDate || (this.minDate && this.minDate < this.limits.minDate)) {
      this.minDate = this.limits.minDate
    }

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
    return date < this.maxDate
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
    return date > this.minDate
  }

  isValid () {
    if ((!this.day && !this.hideDay) || !this.month || !this.year) {
      return false
    }

    return true
  }
}

export const dateLimits = (relationship, birthdate) => {
  let max = new Date()
  let min = extractDate(birthdate)

  switch (relationship) {
  case 'Self':
    max = daysAgo(today, 365 * 16)
    min = daysAgo(today, (365 * 130) + 1)
    break
  case 'Mother':
  case 'Father':
    max = min
    min = daysAgo(today, (365 * 200) + 1)
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
  case 'Mother-in-law':
  case 'Guardian':
  case 'Other':
    min = daysAgo(today, (365 * 200) + 1)
    break
  default:
    // Everything else just uses the defaults
    if (!min) {
      min = daysAgo(today, (365 * 200) + 1)
    }
  }

  return { minDate: min, maxDate: max }
}
