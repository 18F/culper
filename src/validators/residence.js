import DateRangeValidator from './daterange'
import AddressValidator from './address'
import ReferenceValidator from './reference'

// Options for roles
const roleOptions = ['Other', 'Military', 'Owned', 'Renter']

export default class ResidenceValidator {
  constructor (state, props) {
    this.dates = state.Dates
    this.address = state.Address
    this.reference = state.Reference
    this.role = state.Role
    this.roleOther = state.RoleOther
  }

  validDates () {
    return new DateRangeValidator(this.dates, null).isValid()
  }

  validAddress () {
    return new AddressValidator(this.address, null).isValid()
  }

  validReference () {
    return new ReferenceValidator(this.reference, null).isValid()
  }

  /**
   * Ensures a role is selected and that if Other is marked, it requires the other information to
   * be populated.
   */
  validRole () {
    if (!this.role) {
      return false
    }

    if (!roleOptions.includes(this.role)) {
      return false
    }

    if (this.role === 'Other' && !this.roleOther) {
      return false
    }
    return true
  }

  isValid () {
    return this.validDates() &&
      this.validAddress() &&
      this.validReference() &&
      this.validRole()
  }
}
