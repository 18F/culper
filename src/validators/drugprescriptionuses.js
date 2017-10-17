import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield } from './helpers'

export default class DrugPrescriptionUsesValidator {
  constructor (data = {}) {
    this.usedDrugs = (data.MisusedDrugs || {}).value
    this.list = data.List
    this.listBranch = data.ListBranch
  }

  validMisusedDrugs () {
    return validBranch(this.usedDrugs)
  }

  validDrugPrescriptionUses () {
    if (this.validMisusedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new DrugPrescriptionUseValidator(item.Item, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validMisusedDrugs() &&
      this.validDrugPrescriptionUses()
  }
}

export class DrugPrescriptionUseValidator {
  constructor (data = {}) {
    this.prescriptionName = data.PrescriptionName
    this.involvementDates = data.InvolvementDates
    this.reason = data.Reason
    this.useWhileEmployed = (data.UseWhileEmployed || {}).value
    this.useWithClearance = (data.UseWithClearance || {}).value
  }

  isValid () {
    return new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.prescriptionName) &&
      validGenericTextfield(this.reason) &&
      validBranch(this.useWhileEmployed) &&
      validBranch(this.useWithClearance)
  }
}
