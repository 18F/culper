import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield, validGenericMonthYear } from './helpers'

export default class DrugInvolvementsValidator {
  constructor (data = {}) {
    this.involved = data.Involved
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new DrugInvolvementValidator(item.Item).isValid()
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
  constructor (data = {}) {
    this.drugType = data.DrugType
    this.firstInvolvement = data.FirstInvolvement
    this.recentInvolvement = data.RecentInvolvement
    this.natureOfInvolvement = data.NatureOfInvolvement
    this.involvementWhileEmployed = data.InvolvementWhileEmployed
    this.involvementWithClearance = data.InvolvementWithClearance
    this.involvementInFuture = data.InvolvementInFuture
    this.reasons = data.Reasons
    this.explanation = data.Explanation
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
