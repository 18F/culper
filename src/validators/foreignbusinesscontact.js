import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import { validGenericTextfield, validDateField, BranchCollection } from './helpers'

export default class ForeignBusinessContactValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignContact = props.HasForeignContact
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasForeignContact === 'No') {
      return true
    }

    if (this.hasForeignContact === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new ContactValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ContactValidator {
  constructor (state = {}, props = {}) {
    this.name = props.Name
    this.location = props.Location
    this.date = props.Date
    this.governments = props.Governments
    this.establishment = props.Establishment
    this.representatives = props.Representatives
    this.purpose = props.Purpose
    this.subsequentContacts = props.SubsequentContacts
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validLocation () {
    return !!this.location && new BirthPlaceValidator(this.location, null).isValid()
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validGovernments () {
    return !!this.governments && !!this.governments.value && this.governments.value.length > 0
  }

  validEstablishment () {
    return !!this.establishment && validGenericTextfield(this.establishment)
  }

  validRepresentatives () {
    return !!this.representatives && validGenericTextfield(this.representatives)
  }

  validPurpose () {
    return !!this.purpose && validGenericTextfield(this.purpose)
  }

  validSubsequentContacts () {
    if (!this.subsequentContacts) {
      return false
    }

    const branchValidator = new BranchCollection(this.subsequentContacts.List)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (branchValidator.hasNo()) {
      return true
    }

    return branchValidator.each(item => {
      return validGenericTextfield(item.Subsequent) &&
        validDateField(item.Recent) &&
        validGenericTextfield(item.Future)
    })
  }

  isValid () {
    return this.validName() &&
      this.validLocation() &&
      this.validDate() &&
      this.validGovernments() &&
      this.validEstablishment() &&
      this.validRepresentatives() &&
      this.validPurpose() &&
      this.validSubsequentContacts()
  }
}
