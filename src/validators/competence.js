import AddressValidator from './address'
import { validGenericTextfield, validPhoneNumber, validGenericMonthYear, validDateField, withinSevenYears } from './helpers'

export default class CompetenceValidator {
  constructor (state, props) {
    this.courtAddress = state.CourtAddress
    this.courtName = state.CourtName
    this.disposition = state.Disposition
    this.occurred = state.Occurred
  }

  validCourt () {
    return validGenericTextfield(this.courtName) &&
      new AddressValidator(this.courtAddress)
  }

  validDisposition () {
    return validGenericTextfield(this.disposition)
  }

  validOccurred () {
    return validGenericMonthYear(this.occurred)
  }

  isValid () {
    return this.validCourt() &&
      this.validDisposition() &&
      this.validOccurred()
  }
}
