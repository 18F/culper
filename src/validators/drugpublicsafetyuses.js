import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield } from './helpers'

export default class DrugPublicSafetyUsesValidator {
  constructor (data = {}) {
    this.usedDrugs = data.UsedDrugs
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new DrugPublicSafetyUseValidator(item.Item, null).isValid()
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
  constructor (data = {}) {
    this.description = data.Description
    this.involvementDates = data.InvolvementDates
    this.estimatedUse = data.EstimatedUse
  }

  isValid () {
    return new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.description) &&
      validGenericTextfield(this.estimatedUse)
  }
}
