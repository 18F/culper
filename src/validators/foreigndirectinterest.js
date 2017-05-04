import { validGenericTextfield, validGenericMonthYear, validNotApplicable } from './helpers'
import ForeignCoOwnersValidator from './foreigncoowner'

export default class ForeignDirectInterestValidator {
  constructor (state, props = {}) {
    this.interestTypes = props.InterestTypes
    this.interestType = props.InterestType
    this.acquired = props.Acquired
    this.howAcquired = props.HowAcquired
    this.cost = props.Cost
    this.value = props.Value
    this.relinquished = props.Relinquished
    this.relinquishedNotApplicable = props.RelinquishedNotApplicable
    this.explanation = props.Explanation
    this.coOwners = props.CoOwners
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
    return new ForeignCoOwnersValidator(null, this.coOwners).isValid()
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
