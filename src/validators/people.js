import DateRangeValidator from './daterange'
import NameValidator from './name'
import AddressValidator from './address'
import { validGenericTextfield, validPhoneNumber, validNotApplicable } from './helpers'

export default class PeopleValidator {
  constructor (state = {}) {
    this.people = state.List || []
    this.listBranch = state.ListBranch
  }

  // TODO: Determine if this is being used outside of this file
  validCount () {
    let count = 0

    for (let item of this.people) {
      if (!new PersonValidator(item.Person).isValid()) {
        continue
      }

      count++
    }

    return count
  }

  isValid () {
    if (this.people.length < 1) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (let item of this.people) {
      if (!new PersonValidator(item.Person).isValid()) {
        return false
      }
    }

    return true
  }
}

export class PersonValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.knownDates = state.KnownDates
    this.rank = state.Rank
    this.rankNotApplicable = state.RankNotApplicable
    this.relationship = state.Relationship
    this.relationshipOther = state.RelationshipOther
    this.mobileTelephone = state.MobileTelephone
    this.otherTelephone = state.OtherTelephone
    this.email = state.Email
    this.emailNotApplicable = state.EmailNotApplicable
    this.address = state.Address
  }

  validRelationship () {
    if (!this.relationship || !this.relationship.length) {
      return false
    }
    for (let r of this.relationship) {
      if (!['Neighbor', 'Friend', 'Landlord', 'Business', 'Other'].includes(r)) {
        return false
      }
    }
    if (this.relationship.includes('Other')) {
      return validGenericTextfield(this.relationshipOther)
    }
    return true
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validNotApplicable(this.rankNotApplicable, () => {
        return validGenericTextfield(this.rank)
      }) && new DateRangeValidator(this.knownDates).isValid() &&
      this.validRelationship() &&
      validPhoneNumber(this.mobileTelephone) &&
      validPhoneNumber(this.otherTelephone) &&
      validNotApplicable(this.emailNotApplicable, () => {
        return validGenericTextfield(this.email)
      }) && new AddressValidator(this.address).isValid()
  }
}
