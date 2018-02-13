import LocationValidator from './location'
import DateRangeValidator from './daterange'
import NameValidator from './name'
import { validAccordion, BranchCollection, validGenericTextfield } from './helpers'

export default class MilitaryForeignValidator {
  constructor (data = {}) {
    this.list = data.List || {}
  }

  validItems () {
    if ((this.list.items || []).length === 0) {
      return false
    }

    const branchValidator = new BranchCollection(this.list)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return new ForeignServiceValidator(item.Item).isValid()
    })
  }

  isValid () {
    return this.validItems()
  }
}

export class ForeignServiceValidator {
  constructor (data = {}) {
    this.organization = data.Organization
    this.name = data.Name
    this.dates = data.Dates
    this.country = data.Country
    this.rank = data.Rank
    this.division = data.Division
    this.circumstances = data.Circumstances
    this.reasonLeft = data.ReasonLeft
    this.maintainsContact = (data.MaintainsContact || {}).value
    this.list = data.List || {}
  }

  validOrganization () {
    return this.organization && this.organization.length > 0
  }

  validName () {
    return validGenericTextfield(this.name)
  }

  validDates () {
    return new DateRangeValidator(this.dates).isValid()
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

    return validAccordion(this.list, (item) => {
      return new ForeignContactValidator(item).isValid()
    })
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
  constructor (data) {
    this.name = data.Name
    this.address = data.Address
    this.title = data.Title
    this.dates = data.Dates
    this.frequency = data.Frequency
  }

  validName () {
    return new NameValidator(this.name).isValid()
  }

  validAddress () {
    return new LocationValidator(this.address).isValid()
  }

  validTitle () {
    return validGenericTextfield(this.title)
  }

  validDates () {
    return new DateRangeValidator(this.dates).isValid()
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
