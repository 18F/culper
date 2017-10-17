import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validGenericTextfield } from './helpers'

export default class FederalServiceValidator {
  constructor (data = {}) {
    this.hasFederalService = (data.HasFederalService || {}).value
    this.list = data.List
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasFederalService === 'No') {
      return true
    }

    if (this.hasFederalService === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new FederalServiceItemValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class FederalServiceItemValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.position = data.Position
    this.dates = data.Dates
    this.address = data.Address
  }

  validName () {
    return validGenericTextfield(this.name)
  }

  validPosition () {
    return validGenericTextfield(this.position)
  }

  validAddress () {
    return new LocationValidator(this.address).isValid()
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
