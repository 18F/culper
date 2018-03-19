import { validGenericTextfield, validGenericMonthYear, validNotApplicable } from './helpers'
import ForeignCoOwnersValidator from './foreigncoowner'

export default class ForeignIndirectInterestValidator {
  constructor (data = {}) {
    this.interestTypes = (data.InterestTypes || {}).values || []
    this.interestType = data.InterestType
    this.firstname = data.Firstname
    this.lastname = data.Lastname
    this.relationship = data.Relationship
    this.acquired = data.Acquired
    this.howAcquired = data.HowAcquired
    this.cost = data.Cost
    this.value = data.Value
    this.sold = data.Sold
    this.soldNotApplicable = data.SoldNotApplicable
    this.explanation = data.Explanation
    this.coOwners = data.CoOwners
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
    return new ForeignCoOwnersValidator(this.coOwners).isValid()
  }

  validExplanation () {
    return validNotApplicable(this.soldNotApplicable, () => {
      return validGenericTextfield(this.explanation)
    })
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
