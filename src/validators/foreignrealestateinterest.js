import { validateModel } from 'models/validate'
import foreignRealEstateInterest from 'models/foreignRealEstateInterest'

export const validateForeignRealEstateInterest = data => (
  validateModel(data, foreignRealEstateInterest)
)

export default class ForeignRealEstateInterestValidator {
  constructor(data = {}) {
    this.data = data
  }

  validInterestTypes() {
    return validateModel(this.data, {
      InterestTypes: foreignRealEstateInterest.InterestTypes,
    }) === true
  }

  isValid() {
    return validateForeignRealEstateInterest(this.data) === true
  }
}
