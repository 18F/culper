import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import {
  validAccordion,
  validBranch,
  validGenericTextfield,
  validGenericMonthYear,
} from './helpers'

/** Attribute Validators */
const validateUsedDrugs = usedDrugs => validBranch(usedDrugs)

/** Object Validators (as functions) */
export const validateDrugUse = (data = {}, formType = formTypes.SF86) => {
  // const drugType = data.DrugType
  const firstUse = data.FirstUse
  const recentUse = data.RecentUse
  const natureOfUse = data.NatureOfUse
  const useWhileEmployed = (data.UseWhileEmployed || {}).value
  const useWithClearance = (data.UseWithClearance || {}).value
  const useInFuture = (data.UseInFuture || {}).value
  const explanation = data.Explanation

  const validUseWhileEmployed = !requireDrugWhileSafety(formType) || validBranch(useWhileEmployed)
  const validUseWithClearance = !requireDrugWithClearance(formType) || validBranch(useWithClearance)
  const validUseInFuture = !requireDrugInFuture(formType) || validBranch(useInFuture)

  return validGenericMonthYear(firstUse)
    && validGenericMonthYear(recentUse)
    && validGenericTextfield(natureOfUse)
    && validUseWhileEmployed
    && validUseWithClearance
    && validUseInFuture
    && validGenericTextfield(explanation)
}

const validateDrugUseItems = (items, formType) => (
  validAccordion(items, i => validateDrugUse(i, formType))
)

export const validateDrugUses = (data = {}, formType = formTypes.SF86) => {
  const usedDrugs = (data.UsedDrugs || {}).value
  const list = data.List

  const validUsedDrugs = validateUsedDrugs(usedDrugs)

  if (!validUsedDrugs) return false

  if (validUsedDrugs && usedDrugs === 'No') {
    return true
  }

  return validateDrugUseItems(list, formType)
}

/** Object Validators (as classes) - legacy */
export default class DrugUsesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { authentication } = state
    const { formType } = authentication

    this.data = data
    this.formType = formType

    this.usedDrugs = (data.UsedDrugs || {}).value
    this.list = data.List
  }

  validUsedDrugs() {
    return validateUsedDrugs(this.usedDrugs)
  }

  validDrugUses() {
    if (this.validUsedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validateDrugUseItems(this.list, this.formType)
  }

  isValid() {
    return validateDrugUses(this.data, this.formType)
  }
}

export class DrugUseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { authentication } = state
    const { formType } = authentication

    this.data = data
    this.formType = formType

    this.drugType = data.DrugType
    this.firstUse = data.FirstUse
    this.recentUse = data.RecentUse
    this.natureOfUse = data.NatureOfUse
    this.useWhileEmployed = (data.UseWhileEmployed || {}).value
    this.useWithClearance = (data.UseWithClearance || {}).value
    this.useInFuture = (data.UseInFuture || {}).value
    this.explanation = data.Explanation
  }

  isValid() {
    return validateDrugUse(this.data, this.formType)
  }
}
