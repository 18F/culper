import DateRangeValidator from './daterange'
import { validAccordion, validBranch, validGenericTextfield } from './helpers'

export default class DrugPrescriptionUsesValidator {
  constructor(data = {}) {
    this.usedDrugs = (data.MisusedDrugs || {}).value
    this.list = data.List
  }

  validMisusedDrugs() {
    return validBranch(this.usedDrugs)
  }

  validDrugPrescriptionUses() {
    if (this.validMisusedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DrugPrescriptionUseValidator(item).isValid()
    })
  }

  isValid() {
    return this.validMisusedDrugs() && this.validDrugPrescriptionUses()
  }
}

export class DrugPrescriptionUseValidator {
  constructor(data = {}) {
    this.prescriptionName = data.PrescriptionName
    this.involvementDates = data.InvolvementDates
    this.reason = data.Reason
    this.useWhileEmployed = (data.UseWhileEmployed || {}).value
    this.useWithClearance = (data.UseWithClearance || {}).value
  }

  isValid() {
    return (
      new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.prescriptionName) &&
      validGenericTextfield(this.reason) &&
      validBranch(this.useWhileEmployed) &&
      validBranch(this.useWithClearance)
    )
  }
}
