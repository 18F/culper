import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield, validGenericMonthYear } from './helpers'

export default class DrugUsesValidator {
  constructor (state) {
    this.usedDrugs = state.UsedDrugs
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validUsedDrugs () {
    return validBranch(this.usedDrugs)
  }

  validDrugUses () {
    if (this.validUsedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new DrugUseValidator(item.DrugUse, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validUsedDrugs() &&
      this.validDrugUses()
  }
}

export class DrugUseValidator {
  constructor (state) {
    this.drugType = state.DrugType
    this.firstUse = state.FirstUse
    this.recentUse = state.RecentUse
    this.natureOfUse = state.NatureOfUse
    this.useWhileEmployed = state.UseWhileEmployed
    this.useWithClearance = state.UseWithClearance
    this.useInFuture = state.UseInFuture
    this.explanation = state.Explanation
  }

  isValid () {
    return validGenericMonthYear(this.firstUse) &&
    validGenericMonthYear(this.recentUse) &&
      validGenericTextfield(this.natureOfUse) &&
      validBranch(this.useWhileEmployed) &&
      validBranch(this.useWithClearance) &&
      validBranch(this.useInFuture) &&
      validGenericTextfield(this.explanation)
  }
}
