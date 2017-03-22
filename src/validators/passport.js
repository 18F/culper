import NameValidator from './name'
import DateRangeValidator from './daterange'

const reBook = '^[a-zA-Z]{1}[0-9]{6,9}$'
const reCard = '^[cC]{1}[0-9]{8}$'

export default class PassportValidator {
  constructor (state, props) {
    this.name = state.Name
    this.number = state.Number
    this.card = state.Card
    this.issued = state.Issued
    this.expiration = state.Expiration
    this.comments = state.Comments
    this.hasPassport = state.HasPassport
    this.card = state.Card
  }

  validHasPassport () {
    if (!this.hasPassport) {
      return false
    }

    if (!(this.hasPassport === 'No' || this.hasPassport === 'Yes')) {
      return false
    }

    return true
  }

  validName () {
    if (this.hasPassport === 'No') {
      return true
    }

    return new NameValidator(this.name, null).isValid()
  }

  validPassportNumber () {
    if (this.hasPassport === 'No') {
      return true
    }

    if (!this.number || !this.number.value) {
      return false
    }

    let re = this.card === 'Card' ? new RegExp(reCard) : new RegExp(reBook)
    if (!re.test(this.number.value)) {
      return false
    }

    return true
  }

  validDates () {
    if (this.hasPassport === 'No') {
      return true
    }

    if (!this.isValidEstimatedDate(this.issued)) {
      return false
    }

    if (!this.isValidEstimatedDate(this.expiration)) {
      return false
    }

    const range = {
      from: {
        date: this.issued.date
      },
      to: {
        date: this.expiration.date
      },
      present: false
    }

    if (!new DateRangeValidator(range).isValid()) {
      return false
    }

    return true
  }

  isValid () {
    return this.validHasPassport() &&
      this.validName() &&
      this.validPassportNumber() &&
      this.validDates()
  }

  /**
   * Determines if date information is a valid estimated date
   */
  isValidEstimatedDate (obj) {
    if (!obj) {
      return false
    }

    let month = parseInt(obj.month || '1')
    let day = parseInt(obj.day || '1')
    let year = parseInt(obj.year)

    if (month < 1 || month > 12) {
      return false
    }

    if (day < 1 || day > 31) {
      return false
    }

    if (year < 1) {
      return false
    }

    return true
  }
}
