import {
  validAccordion,
  validBranch,
  validGenericTextfield,
  validGenericMonthYear
} from './helpers'

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

    return validAccordion(this.list, item => {
      return new DrugInvolvementValidator(item).isValid()
    })
  }

  isValid() {
    return this.validInvolved() && this.validDrugInvolvements()
  }
}

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
      validGenericMonthYear(this.firstInvolvement) &&
      validGenericMonthYear(this.recentInvolvement) &&
      validGenericTextfield(this.natureOfInvolvement) &&
      validGenericTextfield(this.reasons) &&
      validBranch(this.involvementWhileEmployed) &&
      validBranch(this.involvementWithClearance) &&
      this.validFuture()
    )
  }
}
