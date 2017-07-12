import NameValidator from './name'
import LocationValidator from './location'
import { validGenericTextfield } from './helpers'

export default class ForeignActivitiesSupportValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignSupport = state.HasForeignSupport
    this.list = state.List || []
    this.listBranch = state.ListBranch
  }

  validList () {
    if (this.hasForeignSupport === 'No') {
      return true
    }

    if (this.hasForeignSupport === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new SupportValidator(item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class SupportValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.address = state.Address
    this.relationship = state.Relationship
    this.amount = state.Amount
    this.frequency = state.Frequency
    this.citizenship = state.Citizenship
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validAddress () {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validRelationship () {
    return !!this.relationship && validGenericTextfield(this.relationship)
  }

  validAmount () {
    return !!this.amount && validGenericTextfield(this.amount)
  }

  validFrequency () {
    return !!this.frequency && validGenericTextfield(this.frequency)
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  isValid () {
    return this.validName() &&
      this.validAddress() &&
      this.validRelationship() &&
      this.validAmount() &&
      this.validFrequency() &&
      this.validCitizenship()
  }
}
