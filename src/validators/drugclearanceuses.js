import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield } from './helpers'

export default class DrugClearanceUsesValidator {
  constructor (data = {}) {
    this.usedDrugs = (data.UsedDrugs || {}).value
    this.list = data.List
    this.listBranch = data.ListBranch
  }

  validUsedDrugs () {
    return validBranch(this.usedDrugs)
  }

  validDrugClearanceUses () {
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
      const result = new DrugClearanceUseValidator(item.Item, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validUsedDrugs() &&
      this.validDrugClearanceUses()
  }
}

export class DrugClearanceUseValidator {
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
