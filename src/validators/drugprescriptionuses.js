import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
} from 'helpers/branches'

import DateRangeValidator from './daterange'
import { validAccordion, validBranch, validGenericTextfield } from './helpers'

/** Attribute Validators */
const validateMisusedDrugs = usedDrugs => validBranch(usedDrugs)

const validateInvolvementDates = dates => new DateRangeValidator(dates).isValid()

/** Object Validators (as functions) */
export const validateDrugPrescriptionUse = (data = {}, formType = formTypes.SF86) => {
  const prescriptionName = data.PrescriptionName
  const involvementDates = data.InvolvementDates
  const reason = data.Reason
  const useWhileEmployed = (data.UseWhileEmployed || {}).value
  const useWithClearance = (data.UseWithClearance || {}).value

  const validUseWhileEmployed = !requireDrugWhileSafety(formType) || validBranch(useWhileEmployed)
  const validUseWithClearance = !requireDrugWithClearance(formType) || validBranch(useWithClearance)

  return validateInvolvementDates(involvementDates)
    && validGenericTextfield(prescriptionName)
    && validGenericTextfield(reason)
    && validUseWhileEmployed
    && validUseWithClearance
}

const validateDrugPrescriptionUseItems = (items, formType) => (
  validAccordion(items, i => validateDrugPrescriptionUse(i, formType))
)

export const validateDrugPrescriptionUses = (data = {}, formType = formTypes.SF86) => {
  const usedDrugs = (data.MisusedDrugs || {}).value
  const list = data.List

  const validMisusedDrugs = validateMisusedDrugs(usedDrugs)

  if (!validMisusedDrugs) return false

  if (validMisusedDrugs && usedDrugs === 'No') {
    return true
  }

  return validateDrugPrescriptionUseItems(list, formType)
}

/** Object Validators (as classes) - legacy */
export default class DrugPrescriptionUsesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType

    this.usedDrugs = (data.MisusedDrugs || {}).value
    this.list = data.List
  }

  validMisusedDrugs() {
    return validateMisusedDrugs(this.usedDrugs)
  }

  validDrugPrescriptionUses() {
    if (this.validMisusedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validateDrugPrescriptionUseItems(this.list, this.formType)
  }

  isValid() {
    return validateDrugPrescriptionUses(this.data, this.formType)
  }
}

export class DrugPrescriptionUseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType

    this.usedDrugs = (data.MisusedDrugs || {}).value
    this.list = data.List

    this.prescriptionName = data.PrescriptionName
    this.involvementDates = data.InvolvementDates
    this.reason = data.Reason
    this.useWhileEmployed = (data.UseWhileEmployed || {}).value
    this.useWithClearance = (data.UseWithClearance || {}).value
  }

  isValid() {
    return validateDrugPrescriptionUse(this.data, this.formType)
  }
}
