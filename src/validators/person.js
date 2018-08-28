import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import {
  validGenericTextfield,
  validPhoneNumber,
  validNotApplicable
} from './helpers'

export default class PersonValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.dates = data.Dates
    this.rank = data.Rank
    this.rankNotApplicable = data.RankNotApplicable
    this.relationship = (data.Relationship || {}).values || []
    this.relationshipOther = data.RelationshipOther
    this.mobileTelephone = data.MobileTelephone
    this.otherTelephone = data.OtherTelephone
    this.email = data.Email
    this.emailNotApplicable = data.EmailNotApplicable
    this.address = data.Address
  }

  validName() {
    return new NameValidator(this.name).isValid()
  }

  validDates() {
    return new DateRangeValidator(this.dates).isValid()
  }

  validRank() {
    return validNotApplicable(this.rankNotApplicable, () => {
      return validGenericTextfield(this.rank)
    })
  }

  validRelationship() {
    if (!this.relationship || !this.relationship.length) {
      return false
    }
    for (let r of this.relationship) {
      if (
        ![
          'Neighbor',
          'Friend',
          'WorkAssociate',
          'Schoolmate',
          'Other'
        ].includes(r)
      ) {
        return false
      }
    }
    if (this.relationship.includes('Other')) {
      return validGenericTextfield(this.relationshipOther)
    }
    return true
  }

  validPhones() {
    return (
      validPhoneNumber(this.mobileTelephone) &&
      validPhoneNumber(this.otherTelephone)
    )
  }

  validEmail() {
    return validNotApplicable(this.emailNotApplicable, () => {
      return validGenericTextfield(this.email)
    })
  }

  validAddress() {
    return new LocationValidator(this.address).isValid()
  }

  isValid() {
    return (
      this.validName() &&
      this.validDates() &&
      this.validRank() &&
      this.validRelationship() &&
      this.validPhones() &&
      this.validEmail() &&
      this.validAddress()
    )
  }
}
