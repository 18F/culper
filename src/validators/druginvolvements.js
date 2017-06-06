import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield, validGenericMonthYear } from './helpers'

export default class DrugInvolvementsValidator {
  constructor (state) {
    this.involved = state.Involved
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validInvolved () {
    return validBranch(this.involved)
  }

  validDrugInvolvements () {
    if (this.validInvolved() && this.involved === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new DrugInvolvementValidator(item.DrugInvolvement, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validInvolved() &&
      this.validDrugInvolvements()
  }
}

export class DrugInvolvementValidator {
  constructor (state) {
    this.drugType = state.DrugType
    this.firstInvolvement = state.FirstInvolvement
    this.recentInvolvement = state.RecentInvolvement
    this.natureOfInvolvement = state.NatureOfInvolvement
    this.involvementWhileEmployed = state.InvolvementWhileEmployed
    this.involvementWithClearance = state.InvolvementWithClearance
    this.involvementInFuture = state.InvolvementInFuture
    this.reasons = state.Reasons
    this.explanation = state.Explanation
  }

  validFuture () {
    switch (this.involvementInFuture) {
      case 'Yes':
        return validGenericTextfield(this.explanation)
      case 'No':
        return true
      default:
        return false
    }
  }

  isValid () {
    return validGenericMonthYear(this.firstInvolvement) &&
      validGenericMonthYear(this.recentInvolvement) &&
      validGenericTextfield(this.natureOfInvolvement) &&
      validGenericTextfield(this.reasons) &&
      validBranch(this.involvementWhileEmployed) &&
      validBranch(this.involvementWithClearance) &&
      this.validFuture()
  }
}
