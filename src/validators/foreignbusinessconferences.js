import DateRangeValidator from './daterange'
import { validGenericTextfield, BranchCollection } from './helpers'

export default class ForeignBusinessConferencesValidator {
  constructor (data = {}) {
    this.hasForeignConferences = (data.HasForeignConferences || {}).value
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasForeignConferences === 'No') {
      return true
    }

    if (this.hasForeignConferences === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new ConferencesValidator(item.Item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ConferencesValidator {
  constructor (data = {}) {
    this.description = data.Description
    this.sponsor = data.Sponsor
    this.city = data.City
    this.country = data.Country
    this.dates = data.Dates
    this.purpose = data.Purpose
    this.contacts = data.Contacts
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validSponsor () {
    return !!this.sponsor && validGenericTextfield(this.sponsor)
  }

  validCity () {
    return !!this.city && validGenericTextfield(this.city)
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validPurpose () {
    return !!this.purpose && validGenericTextfield(this.purpose)
  }

  validContacts () {
    if (!this.contacts) {
      return false
    }

    const branchValidator = new BranchCollection(this.contacts.List)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return validGenericTextfield(item.Explanation)
    })
  }

  isValid () {
    return this.validDescription() &&
      this.validSponsor() &&
      this.validCity() &&
      this.validCountry() &&
      this.validDates() &&
      this.validPurpose() &&
      this.validContacts()
  }
}
