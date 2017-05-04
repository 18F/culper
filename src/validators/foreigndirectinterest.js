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

  isValid () {
    return this.validInterestTypes() &&
      validGenericTextfield(this.interestType) &&
      validGenericMonthYear(this.acquired) &&
      validGenericTextfield(this.howAcquired) &&
      validGenericTextfield(this.cost) &&
      validGenericTextfield(this.value) &&
      validNotApplicable(this.relinquishedNotApplicable, () => {
        return validGenericMonthYear(this.relinquished)
      }) &&
      validGenericTextfield(this.explanation) &&
      new ForeignCoOwnersValidator(null, this.coOwners).isValid()
  }
}
