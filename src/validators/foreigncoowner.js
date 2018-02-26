import LocationValidator from './location'
import NameValidator from './name'
import { validGenericTextfield, BranchCollection } from './helpers'

export default class ForeignCoOwnersValidator {
  constructor (data = {}) {
    this.list = data.List || []
  }

  isValid () {
    const validator = new BranchCollection(this.list)
    if (!validator.validKeyValues()) {
      return false
    }

    if (this.list.items.length === 1 && validator.hasNo()) {
      return true
    }

    return validator.each((item) => {
      return new ForeignCoOwnerValidator(item).isValid()
    })
  }
}

export class ForeignCoOwnerValidator {
  constructor (data = {}) {
    this.name = data.Name || {}
    this.address = data.Address || {}
    this.countries = data.Countries || {}
    this.relationshipNature = data.RelationshipNature || {}
  }

  validCountries () {
    return !!(this.countries && this.countries.value && this.countries.value.length)
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      new LocationValidator(this.address).isValid() &&
      this.validCountries() &&
      validGenericTextfield(this.relationshipNature)
  }
}
