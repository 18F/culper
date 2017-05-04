import { validGenericTextfield, validGenericMonthYear, validNotApplicable } from './helpers'
import ForeignCoOwnersValidator from './foreigncoowner'

export default class ForeignIndirectInterestValidator {
  constructor (state, props = {}) {
    this.interestTypes = props.InterestTypes
    this.interestType = props.InterestType
    this.firstname = props.Firstname
    this.lastname = props.Lastname
    this.relationship = props.Relationship
    this.acquired = props.Acquired
    this.howAcquired = props.HowAcquired
    this.cost = props.Cost
    this.value = props.Value
    this.sold = props.Sold
    this.soldNotApplicable = props.SoldNotApplicable
    this.explanation = props.Explanation
    this.coOwners = props.CoOwners
  }

  validInterestTypes () {
    return !!(this.interestTypes && this.interestTypes.length)
  }

  validInterestType () {
    return validGenericTextfield(this.interestType)
  }

  validFirstname () {
    return validGenericTextfield(this.firstname)
  }

  validLastname () {
    return validGenericTextfield(this.lastname)
  }

  validRelationship () {
    return validGenericTextfield(this.relationship)
  }

  validAcquired () {
    return validGenericMonthYear(this.acquired)
  }

  validHowAcquired () {
    return validGenericTextfield(this.howAcquired)
  }

  validCost () {
    return validGenericTextfield(this.cost)
  }

  validValue () {
    return validGenericTextfield(this.value)
  }

  validSoldNotApplicable () {
    return validNotApplicable(this.soldNotApplicable, () => {
      return validGenericMonthYear(this.sold)
    })
  }

  validCoOwners () {
    return new ForeignCoOwnersValidator(null, this.coOwners).isValid()
  }

  validExplanation () {
    return validGenericTextfield(this.explanation)
  }

  isValid () {
    return this.validInterestTypes() &&
      this.validInterestType() &&
      this.validFirstname() &&
      this.validLastname() &&
      this.validRelationship() &&
      this.validAcquired() &&
      this.validHowAcquired() &&
      this.validCost() &&
      this.validValue() &&
      this.validSoldNotApplicable() &&
      this.validCoOwners() &&
      this.validExplanation()
  }
}
