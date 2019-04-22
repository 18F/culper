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
const validateFuture = (involvementInFuture, explanation) => {
  switch (involvementInFuture) {
    case 'Yes':
      return validGenericTextfield(explanation)
    case 'No':
      return true
    default:
      return false
  }
}

const validateInvolved = involved => validBranch(involved)

/** Object Validators (as functions) */
export const validateDrugInvolvement = (data = {}, formType = formTypes.SF86) => {
  // const drugType = data.DrugType
  const firstInvolvement = data.FirstInvolvement
  const recentInvolvement = data.RecentInvolvement
  const natureOfInvolvement = data.NatureOfInvolvement
  const involvementWhileEmployed = (data.InvolvementWhileEmployed || {}).value
  const involvementWithClearance = (data.InvolvementWithClearance || {}).value
  const involvementInFuture = (data.InvolvementInFuture || {}).value
  const reasons = data.Reasons
  const explanation = data.Explanation

  const validInvolvementWhileEmployed = !requireDrugWhileSafety(formType)
    || validBranch(involvementWhileEmployed)
  const validInvolvementWithClearance = !requireDrugWithClearance(formType)
    || validBranch(involvementWithClearance)
  const validInvolvementInFuture = !requireDrugInFuture(formType)
    || validateFuture(involvementInFuture, explanation)

  return validGenericMonthYear(firstInvolvement)
    && validGenericMonthYear(recentInvolvement)
    && validGenericTextfield(natureOfInvolvement)
    && validGenericTextfield(reasons)
    && validInvolvementWhileEmployed
    && validInvolvementWithClearance
    && validInvolvementInFuture
}

const validateDrugInvolvementItems = (items, formType) => (
  validAccordion(items, i => validateDrugInvolvement(i, formType))
)

export const validateDrugInvolvements = (data = {}, formType = formTypes.SF86) => {
  const involved = (data.Involved || {}).value
  const list = data.List

  const validInvolved = validateInvolved(involved)

  if (!validInvolved) return false

  if (validInvolved && involved === 'No') {
    return true
  }

  return validateDrugInvolvementItems(list, formType)
}

/** Object Validators (as classes) - legacy */
export class DrugInvolvementValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType

    this.drugType = data.DrugType
    this.firstInvolvement = data.FirstInvolvement
    this.recentInvolvement = data.RecentInvolvement
    this.natureOfInvolvement = data.NatureOfInvolvement
    this.involvementWhileEmployed = (data.InvolvementWhileEmployed || {}).value
    this.involvementWithClearance = (data.InvolvementWithClearance || {}).value
    this.involvementInFuture = (data.InvolvementInFuture || {}).value
    this.reasons = data.Reasons
    this.explanation = data.Explanation
  }

  validFuture() {
    return validateFuture(this.involvementInFuture, this.explanation)
  }

  isValid() {
    return validateDrugInvolvement(this.data, this.formType)
  }
}

export default class DrugInvolvementsValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings

    this.data = data
    this.formType = formType

    this.involved = (data.Involved || {}).value
    this.list = data.List
  }

  validInvolved() {
    return validateInvolved(this.involved)
  }

  validDrugInvolvements() {
    if (this.validInvolved() && this.involved === 'No') {
      return true
    }

    return validateDrugInvolvementItems(this.list, this.formType)
  }

  isValid() {
    return validateDrugInvolvements(this.data, this.formType)
  }
}
