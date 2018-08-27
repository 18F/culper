import DateRangeValidator from './daterange'
import { validAccordion, validBranch, validGenericTextfield } from './helpers'

export default class DrugClearanceUsesValidator {
  constructor(data = {}) {
    this.usedDrugs = (data.UsedDrugs || {}).value
    this.list = data.List
  }

  validUsedDrugs() {
    return validBranch(this.usedDrugs)
  }

  validDrugClearanceUses() {
    if (this.validUsedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DrugClearanceUseValidator(item).isValid()
    })
  }

  isValid() {
    return this.validUsedDrugs() && this.validDrugClearanceUses()
  }
}

export class DrugClearanceUseValidator {
  constructor(data = {}) {
    this.description = data.Description
    this.involvementDates = data.InvolvementDates
    this.estimatedUse = data.EstimatedUse
  }

  isValid() {
    return (
      new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.description) &&
      validGenericTextfield(this.estimatedUse)
    )
  }
}
