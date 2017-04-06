import AddressValidator from './address'
import { validGenericTextfield, validGenericMonthYear, BranchCollection } from './helpers'

export default class OrderValidator {
  constructor (state = {}, props) {
    this.courtAddress = state.CourtAddress
    this.courtName = state.CourtName
    this.disposition = state.Disposition
    this.occurred = state.Occurred
    this.appeals = state.Appeals
  }

  validCourt () {
    return validGenericTextfield(this.courtName) &&
      new AddressValidator(this.courtAddress).isValid()
  }

  validDisposition () {
    return validGenericTextfield(this.disposition)
  }

  validOccurred () {
    return validGenericMonthYear(this.occurred)
  }

  validAppeals () {
    const branchValidator = new BranchCollection(this.appeals)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return validGenericTextfield(item.CourtName) &&
        new AddressValidator(item.CourtAddress)
    })
  }

  isValid () {
    return this.validCourt() &&
      this.validDisposition() &&
      this.validOccurred() &&
      this.validAppeals()
  }
}
