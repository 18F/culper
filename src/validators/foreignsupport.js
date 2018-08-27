import NameValidator from './name'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield } from './helpers'

export default class ForeignActivitiesSupportValidator {
  constructor(data = {}) {
    this.hasForeignSupport = (data.HasForeignSupport || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignSupport === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new SupportValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class SupportValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.address = data.Address
    this.relationship = data.Relationship
    this.amount = data.Amount
    this.frequency = data.Frequency
    this.citizenship = data.Citizenship
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validAddress() {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validRelationship() {
    return !!this.relationship && validGenericTextfield(this.relationship)
  }

  validAmount() {
    return !!this.amount && validGenericTextfield(this.amount)
  }

  validFrequency() {
    return !!this.frequency && validGenericTextfield(this.frequency)
  }

  validCitizenship() {
    return (
      !!this.citizenship &&
      !!this.citizenship.value &&
      this.citizenship.value.length > 0
    )
  }

  isValid() {
    return (
      this.validName() &&
      this.validAddress() &&
      this.validRelationship() &&
      this.validAmount() &&
      this.validFrequency() &&
      this.validCitizenship()
    )
  }
}
