/*
import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'
*/

import {
  validAccordion,
  validBranch,
  validGenericTextfield,
  validGenericMonthYear,
} from './helpers'

// TODO

/** Attribute Validators */

/** Object Validators (as functions) */

/** Object Validators (as classes) - legacy */
export class DrugInvolvementValidator {
  constructor(data = {}) {
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
    switch (this.involvementInFuture) {
      case 'Yes':
        return validGenericTextfield(this.explanation)
      case 'No':
        return true
      default:
        return false
    }
  }

  isValid() {
    return (
      validGenericMonthYear(this.firstInvolvement)
      && validGenericMonthYear(this.recentInvolvement)
      && validGenericTextfield(this.natureOfInvolvement)
      && validGenericTextfield(this.reasons)
      && validBranch(this.involvementWhileEmployed)
      && validBranch(this.involvementWithClearance)
      && this.validFuture()
    )
  }
}

export default class DrugInvolvementsValidator {
  constructor(data = {}) {
    this.involved = (data.Involved || {}).value
    this.list = data.List
  }

  validInvolved() {
    return validBranch(this.involved)
  }

  validDrugInvolvements() {
    if (this.validInvolved() && this.involved === 'No') {
      return true
    }

    return validAccordion(this.list, item => new DrugInvolvementValidator(item).isValid())
  }

  isValid() {
    return this.validInvolved() && this.validDrugInvolvements()
  }
}
