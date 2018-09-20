import NameValidator from './name'
import DateRangeValidator from './daterange'

const reBook = '^[a-zA-Z0-9]{6,9}$'

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

    let re = new RegExp(reBook)
    if (!re.test(this.number.value)) {
      return false
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
