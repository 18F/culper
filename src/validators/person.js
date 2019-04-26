import DateRangeValidator from './daterange'
import LocationValidator from './location'
import NameValidator from './name'
import {
  validGenericTextfield,
  validPhoneNumber,
  validNotApplicable,
} from './helpers'

/** Attribute Validators */
const validateName = name => new NameValidator(name).isValid()

const validateDates = dates => new DateRangeValidator(dates).isValid()

const validateRank = (rankNotApplicable, rank) => (
  validNotApplicable(rankNotApplicable, () => validGenericTextfield(rank))
)

const validateRelationship = (relationship, relationshipOther) => {
  if (!relationship || !relationship.length) return false

  const relationshipTypes = ['Neighbor', 'Friend', 'WorkAssociate', 'Schoolmate', 'Other']

  for (let i = 0; i < relationship.length; i += 1) {
    const r = relationship[i]
    if (!relationshipTypes.includes(r)) return false
  }

  if (relationship.includes('Other')) return validGenericTextfield(relationshipOther)

  return true
}

const validatePhones = (mobileTelephone, otherTelephone) => {
  // At least one phone number is required
  if (mobileTelephone.noNumber && otherTelephone.noNumber) return false

  return validPhoneNumber(mobileTelephone) && validPhoneNumber(otherTelephone)
}

const validateEmail = (emailNotApplicable, email) => (
  validNotApplicable(emailNotApplicable, () => validGenericTextfield(email))
)

const validateAddress = address => new LocationValidator(address).isValid()

/** Object Validators (as functions) */
export const validatePerson = (data = {}) => {
  const {
    Name, Dates, Rank, RankNotApplicable, Relationship, RelationshipOther,
    MobileTelephone, OtherTelephone, Email, EmailNotApplicable, Address,
  } = data

  const relationshipValues = (Relationship || {}).values || []

  const isValid = validateName(Name)
    && validateDates(Dates)
    && validateRank(RankNotApplicable, Rank)
    && validateRelationship(relationshipValues, RelationshipOther)
    && validatePhones(MobileTelephone, OtherTelephone)
    && validateEmail(EmailNotApplicable, Email)
    && validateAddress(Address)

  return isValid
}

/** Object Validators (as classes) - legacy */
export default class PersonValidator {
  constructor(data = {}) {
    this.data = data

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
    return validateName(this.name)
  }

  validDates() {
    return validateDates(this.dates)
  }

  validRank() {
    return validateRank(this.rankNotApplicable, this.rank)
  }

  validRelationship() {
    return validateRelationship(this.relationship, this.relationshipOther)
  }

  validPhones() {
    return validatePhones(this.mobileTelephone, this.otherTelephone)
  }

  validEmail() {
    return validateEmail(this.emailNotApplicable, this.email)
  }

  validAddress() {
    return validateAddress(this.address)
  }

  isValid() {
    return validatePerson(this.data)
  }
}
