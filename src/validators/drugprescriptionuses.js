import DateRangeValidator from './daterange'
import { validAccordion, validBranch, validGenericTextfield } from './helpers'

class DrugPrescriptionUsesBase {
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

export default class DrugPrescriptionUsesValidator extends DrugPrescriptionUsesBase {

  validDrugPrescriptionUses() {
    if (this.validMisusedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DrugPrescriptionUseValidator(item).isValid()
    })
  }
}

export class DrugPrescriptionUses85Validator extends DrugPrescriptionUsesBase {

  validDrugPrescriptionUses() {
    if (this.validMisusedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DrugPrescriptionUse85Validator(item).isValid()
    })
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

export class DrugPrescriptionUse85Validator {
  constructor(data = {}) {
    this.prescriptionName = data.PrescriptionName
    this.involvementDates = data.InvolvementDates
    this.reason = data.Reason
  }

  isValid() {
    return (
      new DateRangeValidator(this.involvementDates).isValid() &&
      validGenericTextfield(this.prescriptionName) &&
      validGenericTextfield(this.reason)
    )
  }
}
