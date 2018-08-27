import NameValidator from './name'
import DateRangeValidator from './daterange'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield } from './helpers'

export default class ForeignBusinessVenturesValidator {
  constructor(data = {}) {
    this.hasForeignVentures = (data.HasForeignVentures || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignVentures === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new VenturesValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class VenturesValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.address = data.Address
    this.citizenship = data.Citizenship
    this.description = data.Description
    this.relationship = data.Relationship
    this.dates = data.Dates
    this.association = data.Association
    this.position = data.Position
    this.service = data.Service
    this.support = data.Support
    this.compensation = data.Compensation
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validAddress() {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validCitizenship() {
    return (
      !!this.citizenship &&
      !!this.citizenship.value &&
      this.citizenship.value.length > 0
    )
  }

  validDescription() {
    return !!this.description && validGenericTextfield(this.description)
  }

  validRelationship() {
    return !!this.relationship && validGenericTextfield(this.relationship)
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validAssociation() {
    return !!this.association && validGenericTextfield(this.association)
  }

  validPosition() {
    return !!this.position && validGenericTextfield(this.position)
  }

  validService() {
    return !!this.service && validGenericTextfield(this.service)
  }

  validSupport() {
    return !!this.support && validGenericTextfield(this.support)
  }

  validCompensation() {
    return !!this.compensation && validGenericTextfield(this.compensation)
  }

  isValid() {
    return (
      this.validName() &&
      this.validAddress() &&
      this.validCitizenship() &&
      this.validDescription() &&
      this.validRelationship() &&
      this.validDates() &&
      this.validAssociation() &&
      this.validPosition() &&
      this.validService() &&
      this.validSupport() &&
      this.validCompensation()
    )
  }
}
