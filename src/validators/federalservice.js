import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validGenericTextfield } from './helpers'

export default class FederalServiceValidator {
  constructor (state = {}, props = {}) {
    this.hasFederalService = state.HasFederalService
    this.list = state.List
  }

  validList () {
    if (this.hasFederalService === 'No') {
      return true
    }

    if (this.hasFederalService === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      return this.list.every(item => new FederalServiceItemValidator(item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class FederalServiceItemValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.position = state.Position
    this.dates = state.Dates
    this.address = state.Address
  }

  validName () {
    return validGenericTextfield(this.name)
  }

  validPosition () {
    return validGenericTextfield(this.position)
  }

  validAddress () {
    return new AddressValidator(this.address, null).isValid()
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  isValid () {
    return this.validName() &&
      this.validPosition() &&
      this.validAddress() &&
      this.validDates()
  }
}
