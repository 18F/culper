import { validDateField } from './helpers'
import { now } from '../components/Section/History/dateranges'

export default class IdentificationBirthDateValidator {
  constructor (data = {}) {
    if (data && data.value && Object.prototype.toString.call(data.value) === '[object Date]') {
      this.date = {
        ...data,
        date: data.value
      }
    } else if (data && data.value && Object.prototype.toString.call(data.value) === '[object Object]') {
      this.date = data.value
    } else {
      this.date = data || {}
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
