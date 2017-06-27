import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import { validGenericTextfield, validDateField, BranchCollection, validBranch } from './helpers'

export default class CitizenshipPassportsValidator {
  constructor (state = {}) {
    this.passports = state.Passports || []
  }

  validPassports () {
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

  isValid () {
    return this.validPassports()
  }
}

export class PassportItemValidator {
  constructor (state = {}, props = {}) {
    this.country = state.Country
    this.issued = state.Issued
    this.location = state.Location
    this.name = state.Name
    this.number = state.Number
    this.expiration = state.Expiration
    this.used = state.Used
    this.countries = state.Countries
  }

  validCountry () {
    return !!this.country && this.country.length > 0
  }

  validIssued () {
    return !!this.issued && validDateField(this.issued)
  }

  validLocation () {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validNumber () {
    return !!this.number && validGenericTextfield(this.number)
  }

  validExpiration () {
    return !!this.expiration && validDateField(this.expiration)
  }

  validUsed () {
    return !!this.used && (this.used === 'Yes' || this.used === 'No')
  }

  validCountries () {
    if (this.used !== 'Yes') {
      return true
    }

    if (this.countries.length === 0) {
      return false
    }

    for (const country of this.countries) {
      if (new TravelValidator(country.Item, null).isValid() !== true) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validCountry() &&
      this.validIssued() &&
      this.validLocation() &&
      this.validName() &&
      this.validNumber() &&
      this.validExpiration() &&
      this.validUsed() &&
      this.validCountries()
  }
}

export class TravelValidator {
  constructor (state = {}, props = {}) {
    this.country = state.Country
    this.dates = state.Dates
  }

  validCountry () {
    return !!this.country && this.country.length > 0
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  isValid () {
    return this.validCountry() && this.validDates()
  }
}
