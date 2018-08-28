import NameValidator from './name'
import LocationValidator from './location'
import {
  validAccordion,
  validGenericTextfield,
  validDateField,
  BranchCollection
} from './helpers'

export default class ForeignBusinessContactValidator {
  constructor(data = {}) {
    this.hasForeignContact = (data.HasForeignContact || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignContact === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ContactValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class ContactValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.location = data.Location
    this.date = data.Date
    this.governments = data.Governments
    this.establishment = data.Establishment
    this.representatives = data.Representatives
    this.purpose = data.Purpose
    this.subsequentContacts = data.SubsequentContacts
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validLocation() {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validGovernments() {
    return (
      !!this.governments &&
      !!this.governments.value &&
      this.governments.value.length > 0
    )
  }

  validEstablishment() {
    return !!this.establishment && validGenericTextfield(this.establishment)
  }

  validRepresentatives() {
    return !!this.representatives && validGenericTextfield(this.representatives)
  }

  validPurpose() {
    return !!this.purpose && validGenericTextfield(this.purpose)
  }

  validSubsequentContacts() {
    if (!this.subsequentContacts) {
      return false
    }

    const branchValidator = new BranchCollection(this.subsequentContacts)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return (
        validGenericTextfield(item.Subsequent) &&
        validDateField(item.Recent) &&
        validGenericTextfield(item.Future)
      )
    })
  }

  isValid() {
    return (
      this.validName() &&
      this.validLocation() &&
      this.validDate() &&
      this.validGovernments() &&
      this.validEstablishment() &&
      this.validRepresentatives() &&
      this.validPurpose() &&
      this.validSubsequentContacts()
    )
  }
}
