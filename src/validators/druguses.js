import {
  validAccordion,
  validBranch,
  validGenericTextfield,
  validGenericMonthYear
} from './helpers'

export default class DrugUsesValidator {
  constructor(data = {}) {
    this.usedDrugs = (data.UsedDrugs || {}).value
    this.list = data.List
  }

  validUsedDrugs() {
    return validBranch(this.usedDrugs)
  }

  validDrugUses() {
    if (this.validUsedDrugs() && this.usedDrugs === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DrugUseValidator(item).isValid()
    })
  }

  isValid() {
    return this.validUsedDrugs() && this.validDrugUses()
  }
}

export class DrugUseValidator {
  constructor(data = {}) {
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
    return (
      validGenericMonthYear(this.firstUse) &&
      validGenericMonthYear(this.recentUse) &&
      validGenericTextfield(this.natureOfUse) &&
      validBranch(this.useWhileEmployed) &&
      validBranch(this.useWithClearance) &&
      validBranch(this.useInFuture) &&
      validGenericTextfield(this.explanation)
    )
  }
}
