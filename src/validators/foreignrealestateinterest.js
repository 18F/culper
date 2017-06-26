import { validGenericTextfield, validGenericMonthYear, validNotApplicable } from './helpers'
import ForeignCoOwnersValidator from './foreigncoowner'
import LocationValidator from './location'

export default class ForeignRealEstateInterestValidator {
  constructor (state, props = {}) {
    this.interestTypes = props.InterestTypes
    this.realEstateType = props.RealEstateType
    this.address = props.Address
    this.acquired = props.Acquired
    this.howAcquired = props.HowAcquired
    this.cost = props.Cost
    this.sold = props.Sold
    this.soldNotApplicable = props.SoldNotApplicable
    this.coOwners = props.CoOwners
  }

  validInterestTypes () {
    return !!(this.interestTypes && this.interestTypes.length)
  }

  validRealEstateType () {
    return validGenericTextfield(this.realEstateType)
  }

  validAddress () {
    return new LocationValidator(this.address).isValid()
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

  validSoldNotApplicable () {
    return validNotApplicable(this.soldNotApplicable, () => {
      return validGenericMonthYear(this.sold)
    })
  }

  validCoOwners () {
    return new ForeignCoOwnersValidator(null, this.coOwners).isValid()
  }

  isValid () {
    return this.validInterestTypes() &&
      this.validRealEstateType() &&
      this.validAddress() &&
      this.validAcquired() &&
      this.validHowAcquired() &&
      this.validCost() &&
      this.validSoldNotApplicable() &&
      this.validCoOwners()
  }
}
