import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import {
  validAccordion,
  validGenericTextfield,
  validDateField,
  BranchCollection
} from './helpers'

export default class CitizenshipPassportsValidator {
  constructor(data = {}) {
    this.passports = data.Passports || []
  }

  validPassports() {
    const bc = new BranchCollection(this.passports)
    if (!bc.validKeyValues()) {
      return false
    }

    if (bc.hasNo()) {
      return true
    }

    return bc.each(item => {
      return new PassportItemValidator(item.Item, null).isValid()
    })
  }

  isValid() {
    return this.validPassports()
  }
}

export class PassportItemValidator {
  constructor(data = {}) {
    this.country = data.Country
    this.issued = data.Issued
    this.location = data.Location
    this.name = data.Name
    this.number = data.Number
    this.expiration = data.Expiration
    this.used = (data.Used || {}).value
    this.countries = data.Countries || {}
  }

  validCountry() {
    return validGenericTextfield(this.country)
  }

  validIssued() {
    return !!this.issued && validDateField(this.issued)
  }

  validLocation() {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validNumber() {
    return !!this.number && validGenericTextfield(this.number)
  }

  validExpiration() {
    return !!this.expiration && validDateField(this.expiration)
  }

  validUsed() {
    return !!this.used && (this.used === 'Yes' || this.used === 'No')
  }

  validCountries() {
    if (this.used !== 'Yes') {
      return true
    }

    return validAccordion(
      this.countries,
      item => {
        return new TravelItemValidator(item).isValid()
      },
      true
    )
  }

  isValid() {
    return (
      this.validCountry() &&
      this.validIssued() &&
      this.validLocation() &&
      this.validName() &&
      this.validNumber() &&
      this.validExpiration() &&
      this.validUsed() &&
      this.validCountries()
    )
  }
}

export class TravelItemValidator {
  constructor(data = {}) {
    this.country = data.Country
    this.dates = data.Dates
  }

  validCountry() {
    return validGenericTextfield(this.country)
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  isValid() {
    return this.validCountry() && this.validDates()
  }
}
