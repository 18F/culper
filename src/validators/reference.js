import NameValidator from './name'
import AddressValidator from './address'
import { validDateField, validPhoneNumber, validGenericTextfield } from './helpers'

const relationshipOptions = ['Neighbor', 'Friend', 'Landlord', 'Business', 'Other']
export default class ReferenceValidator {
  constructor (state, props) {
    this.fullName = state.FullName
    this.lastContact = state.LastContact
    this.relationship = state.Relationship
    this.phone = state.Phone
    this.email = state.Email
    this.address = state.Address
  }

  validFullName () {
    return new NameValidator(this.fullName).isValid()
  }

  validLastContact () {
    return validDateField(this.lastContact)
  }

  validRelationship () {
    return relationshipOptions.includes(this.relationship)
  }

  validPhone () {
    return validPhoneNumber(this.phone)
  }

  validEmail () {
    return validGenericTextfield(this.email)
  }

  validAddress () {
    return new AddressValidator(this.address).isValid()
  }

  isValid () {
    return this.validFullName() &&
      this.validLastContact() &&
      this.validRelationship() &&
      this.validPhone() &&
      this.validEmail() &&
      this.validAddress()
  }
}
