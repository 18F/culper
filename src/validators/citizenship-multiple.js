import DateRangeValidator from './daterange'
import AddressValidator from './address'
import NameValidator from './name'
import { validGenericTextfield, validDateField, BranchCollection } from './helpers'

export default class CitizenshipMultipleValidator {
  constructor (state = {}, props = {}) {
    this.hasMultiple = state.HasMultiple
    this.citizenships = state.Citizenships || []
    this.citizenshipsBranch = state.CitizenshipsBranch
    this.passports = state.Passports || []
  }

  validHasMultiple () {
    return !!this.hasMultiple && (this.hasMultiple === 'Yes' || this.hasMultiple === 'No')
  }

  validCitizenships () {
    if (this.hasMultiple !== 'Yes') {
      return true
    }

    if (this.citizenships.length === 0) {
      return false
    }

    if (this.citizenshipsBranch !== 'No') {
      return false
    }

    for (const citizenship of this.citizenships) {
      if (new CitizenshipItemValidator(citizenship.Item, null).isValid() !== true) {
        return false
      }
    }

    return true
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
    return this.validHasMultiple() &&
      this.validCitizenships() &&
      this.validPassports()
  }
}

export class CitizenshipItemValidator {
  constructor (state = {}, props = {}) {
    this.country = state.Country
    this.dates = state.Dates
    this.how = state.How
    this.renounced = state.Renounced
    this.renouncedExplanation = state.RenouncedExplanation
    this.current = state.Current
    this.currentExplanation = state.CurrentExplanation
  }

  validCountry () {
    return !!this.country && this.country.length > 0
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validHow () {
    return !!this.how && validGenericTextfield(this.how)
  }

  validRenounced () {
    return !!this.renounced &&
      (this.renounced === 'Yes' || this.renounced === 'No') &&
      (this.renounced === 'No' || (this.renounced === 'Yes' && validGenericTextfield(this.renouncedExplanation)))
  }

  validCurrent () {
    return !!this.current &&
      (this.current === 'Yes' || this.current === 'No') &&
      (this.current === 'No' || (this.current === 'Yes' && validGenericTextfield(this.currentExplanation)))
  }

  isValid () {
    return this.validCountry() &&
      this.validDates() &&
      this.validHow() &&
      this.validRenounced() &&
      this.validCurrent()
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
    return !!this.location && new AddressValidator(this.location, null).isValid()
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
