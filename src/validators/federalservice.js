import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield } from './helpers'

export default class FederalServiceValidator {
  constructor(data = {}) {
    this.hasFederalService = (data.HasFederalService || {}).value
    this.list = data.List
  }

  validList() {
    if (this.hasFederalService === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new FederalServiceItemValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class FederalServiceItemValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.position = data.Position
    this.dates = data.Dates
    this.address = data.Address
  }

  validName() {
    return validGenericTextfield(this.name)
  }

  validPosition() {
    return validGenericTextfield(this.position)
  }

  validAddress() {
    return new LocationValidator(this.address).isValid()
  }

  validDates() {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  isValid() {
    return (
      this.validName() &&
      this.validPosition() &&
      this.validAddress() &&
      this.validDates()
    )
  }
}
