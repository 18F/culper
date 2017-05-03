import NameValidator from './name'
import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validGenericTextfield } from './helpers'

export default class ForeignBusinessVenturesValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignVentures = state.HasForeignVentures
    this.list = state.List || []
  }

  validList () {
    if (this.hasForeignVentures === 'No') {
      return true
    }

    if (this.hasForeignVentures === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      return this.list.every(item => new VenturesValidator(item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class VenturesValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.address = state.Address
    this.citizenship = state.Citizenship
    this.description = state.Description
    this.relationship = state.Relationship
    this.dates = state.Dates
    this.association = state.Association
    this.position = state.Position
    this.service = state.Service
    this.compensation = state.Compensation
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validAddress () {
    return !!this.address && new AddressValidator(this.address, null).isValid()
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validRelationship () {
    return !!this.relationship && validGenericTextfield(this.relationship)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validAssociation () {
    return !!this.association && validGenericTextfield(this.association)
  }

  validPosition () {
    return !!this.position && validGenericTextfield(this.position)
  }

  validService () {
    return !!this.service && validGenericTextfield(this.service)
  }

  validCompensation () {
    return !!this.compensation && validGenericTextfield(this.compensation)
  }

  isValid () {
    return this.validName() &&
      this.validAddress() &&
      this.validCitizenship() &&
      this.validDescription() &&
      this.validRelationship() &&
      this.validDates() &&
      this.validAssociation() &&
      this.validPosition() &&
      this.validService() &&
      this.validCompensation()
  }
}
