import NameValidator from './name'
import DateRangeValidator from './daterange'
import { extractDate } from '../components/Section/History/dateranges'

const reBook = '^[a-zA-Z0-9]{9}$'

export default class PassportValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.number = data.Number
    this.card = data.Card
    this.issued = data.Issued
    this.expiration = data.Expiration
    this.comments = data.Comments
    this.hasPassports = (data.HasPassports || {}).value
    this.card = data.Card
  }

  validHasPassports() {
    if (!this.hasPassports) {
      return false
    }

    if (!(this.hasPassports === 'No' || this.hasPassports === 'Yes')) {
      return false
    }

    return true
  }

  validName() {
    if (this.hasPassports === 'No') {
      return true
    }

    return new NameValidator(this.name).isValid()
  }

  validPassportNumber() {
    if (this.hasPassports === 'No') {
      return true
    }

    if (!this.number || !this.number.value) {
      return false
    }

    if (this.issued) {
      const cutoffDate = new Date('1/1/1990 00:00')
      const issueDate = extractDate(this.issued)

      let re = new RegExp(reBook)

      // Before 1/1/1990 allow alphanumeric of any length
      if (issueDate && issueDate < cutoffDate) {
        re = new RegExp('^[a-zA-Z0-9]*$')
        if (!re.test(this.number.value)) {
          return false
        }
      }

      // After 1/1/1990 enforce default regex
      if (!re.test(this.number.value)) {
        return false
      }
    }

    return true
  }

  validDates() {
    if (this.hasPassports === 'No') {
      return true
    }

    const range = {
      from: this.issued,
      to: this.expiration,
      present: false
    }
    return new DateRangeValidator(range).isValid()
  }

  isValid() {
    return (
      this.validHasPassports() &&
      this.validName() &&
      this.validPassportNumber() &&
      this.validDates()
    )
  }
}
