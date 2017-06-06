import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield } from './helpers'

export default class DrugPublicSafetyUsesValidator {
  constructor (state = {}) {
    this.usedDrugs = state.UsedDrugs
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validUsedDrugs () {
    return validBranch(this.usedDrugs)
  }

  validDrugPublicSafetyUses () {
    if (this.validUsedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new DrugPublicSafetyUseValidator(item.DrugPublicSafetyUse, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validUsedDrugs() &&
      this.validDrugPublicSafetyUses()
  }
}

export class DrugPublicSafetyUseValidator {
  constructor (state = {}) {
    this.description = state.Description
    this.involvementDates = state.InvolvementDates
    this.estimatedUse = state.EstimatedUse
  }

  isValid () {
    return new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.description) &&
      validGenericTextfield(this.estimatedUse)
  }
}
