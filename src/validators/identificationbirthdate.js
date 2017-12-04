import { validDateField } from './helpers'
import { now } from '../components/Section/History/dateranges'
import { buildDate } from '../components/Form/DateControl'

export default class IdentificationBirthDateValidator {
  constructor (data = {}) {
    const d = data.Date || {}
    this.date = {
      ...d,
      date: buildDate(d.year, d.month, d.day)
    }
  }

  inRange () {
    const m = now.getMonth() - this.date.date.getMonth()
    let age = now.getFullYear() - this.date.date.getFullYear()
    if (m < 0 || (m === 0 && now.getDate() < this.date.date.getDate())) {
      age--
    }
    return age > 16 && age < 130
  }

  isValid () {
    return validDateField(this.date) && this.inRange()
  }
}
