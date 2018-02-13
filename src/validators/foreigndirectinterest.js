import { validGenericTextfield, validGenericMonthYear, validNotApplicable } from './helpers'
import ForeignCoOwnersValidator from './foreigncoowner'

export default class ForeignDirectInterestValidator {
  constructor (data = {}) {
    this.interestTypes = data.InterestTypes
    this.interestType = data.InterestType
    this.acquired = data.Acquired
    this.howAcquired = data.HowAcquired
    this.cost = data.Cost
    this.value = data.Value
    this.relinquished = data.Relinquished
    this.relinquishedNotApplicable = data.RelinquishedNotApplicable
    this.explanation = data.Explanation
    this.coOwners = data.CoOwners
  }

  validInterestTypes () {
    return !!(this.interestTypes && this.interestTypes.length)
  }

  validInterestType () {
    return validGenericTextfield(this.interestType)
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

  validRelinquishedNotApplicable () {
    return validNotApplicable(this.relinquishedNotApplicable, () => {
      return validGenericMonthYear(this.relinquished)
    })
  }

  validCoOwners () {
    return new ForeignCoOwnersValidator(this.coOwners).isValid()
  }

  validExplanation () {
    return validGenericTextfield(this.explanation)
  }

  isValid () {
    return this.validInterestTypes() &&
      this.validInterestType() &&
      this.validAcquired() &&
      this.validHowAcquired() &&
      this.validCost() &&
      this.validValue() &&
      this.validRelinquishedNotApplicable() &&
      this.validCoOwners() &&
      this.validExplanation()
  }
}
