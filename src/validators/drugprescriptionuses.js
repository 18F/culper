import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield } from './helpers'

export default class DrugPrescriptionUsesValidator {
  constructor (state = {}) {
    this.usedDrugs = state.MisusedDrugs
    this.list = state.List
    this.listBranch = state.ListBranch
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
      const result = new DrugPrescriptionUseValidator(item.DrugPrescriptionUse, null).isValid()
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
  constructor (state = {}) {
    this.prescriptionName = state.PrescriptionName
    this.involvementDates = state.InvolvementDates
    this.reason = state.Reason
    this.useWhileEmployed = state.UseWhileEmployed
    this.useWithClearance = state.UseWithClearance
  }

  isValid () {
    return new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.prescriptionName) &&
      validGenericTextfield(this.reason) &&
      validBranch(this.useWhileEmployed) &&
      validBranch(this.useWithClearance)
  }
}
