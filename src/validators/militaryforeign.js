import AddressValidator from './address'
import DateRangeValidator from './daterange'
import NameValidator from './name'
import { validGenericTextfield } from './helpers'

export default class MilitaryForeignValidator {
  constructor (state, props) {
    this.list = state.List || []
  }

  validItems () {
    if (this.list.length === 0) {
      return false
    }

    for (const service of this.list) {
      if (!(service.Has === 'Yes' || service.Has === 'No')) {
        return false
      }

      if (service.Has === 'Yes' && !service.Item) {
        return false
      }

      if (new ForeignServiceValidator(service.Item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validItems()
  }
}

export class ForeignServiceValidator {
  constructor (state = {}, props = {}) {
    this.organization = state.Organization
    this.name = state.Name
    this.dates = state.Dates
    this.country = state.Country
    this.rank = state.Rank
    this.division = state.Division
    this.circumstances = state.Circumstances
    this.reasonLeft = state.ReasonLeft
    this.maintainsContact = state.MaintainsContact
    this.list = state.List || []
    this.listBranch = state.ListBranch
  }

  validOrganization () {
    return this.organization && this.organization.length > 0
  }

  validName () {
    return validGenericTextfield(this.name)
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validCountry () {
    return validGenericTextfield(this.country)
  }

  validRank () {
    return validGenericTextfield(this.rank)
  }

  validDivision () {
    return validGenericTextfield(this.division)
  }

  validCircumstances () {
    return validGenericTextfield(this.circumstances)
  }

  validReasonLeft () {
    return validGenericTextfield(this.reasonLeft)
  }

  validMaintainsContact () {
    const hasValue = this.maintainsContact === 'Yes' || this.maintainsContact === 'No'
    if (!hasValue) {
      return false
    }

    if (this.maintainsContact === 'No') {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const contact of this.list) {
      if (new ForeignContactValidator(contact.Item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validOrganization() &&
      this.validName() &&
      this.validDates() &&
      this.validCountry() &&
      this.validRank() &&
      this.validDivision() &&
      this.validCircumstances() &&
      this.validReasonLeft() &&
      this.validMaintainsContact()
  }
}

export class ForeignContactValidator {
  constructor (state, props) {
    this.name = state.Name
    this.address = state.Address
    this.title = state.Title
    this.dates = state.Dates
    this.frequency = state.Frequency
  }

  validName () {
    return new NameValidator(this.name, null).isValid()
  }

  validAddress () {
    return new AddressValidator(this.address, null).isValid()
  }

  validTitle () {
    return validGenericTextfield(this.title)
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validFrequency () {
    return validGenericTextfield(this.frequency)
  }

  isValid () {
    return this.validName() &&
      this.validAddress() &&
      this.validTitle() &&
      this.validDates() &&
      this.validFrequency()
  }
}
