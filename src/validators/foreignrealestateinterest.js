import { validGenericTextfield, validGenericMonthYear, validNotApplicable } from './helpers'
import ForeignCoOwnersValidator from './foreigncoowner'
import LocationValidator from './location'

export default class ForeignRealEstateInterestValidator {
  constructor (data = {}) {
    data = data || {}
    this.interestTypes = (data.InterestTypes || {}).values || []
    this.realEstateType = data.RealEstateType || {}
    this.address = data.Address
    this.acquired = data.Acquired
    this.howAcquired = data.HowAcquired
    this.cost = data.Cost
    this.sold = data.Sold
    this.soldNotApplicable = data.SoldNotApplicable
    this.coOwners = data.CoOwners || {}
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
    return new ForeignCoOwnersValidator(this.coOwners).isValid()
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
