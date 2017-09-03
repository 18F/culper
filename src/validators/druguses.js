import DateRangeValidator from './daterange'
import { validBranch, validGenericTextfield, validGenericMonthYear } from './helpers'

export default class DrugUsesValidator {
  constructor (data = {}) {
    this.usedDrugs = data.UsedDrugs
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new DrugUseValidator(item.Item, null).isValid()
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
  constructor (data = {}) {
    this.drugType = data.DrugType
    this.firstUse = data.FirstUse
    this.recentUse = data.RecentUse
    this.natureOfUse = data.NatureOfUse
    this.useWhileEmployed = data.UseWhileEmployed
    this.useWithClearance = data.UseWithClearance
    this.useInFuture = data.UseInFuture
    this.explanation = data.Explanation
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
