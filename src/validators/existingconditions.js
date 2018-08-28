import { ExistingConditionsDiagnosisValidator } from './diagnosis'
import { validAccordion, validGenericTextfield, validBranch } from './helpers'

export default class ExistingConditionsValidator {
  constructor(data = {}) {
    this.hasCondition = (data.HasCondition || {}).value
    this.receivedTreatment = (data.ReceivedTreatment || {}).value
    this.explanation = data.Explanation
    this.treatmentList = data.TreatmentList || {}
    this.didNotFollow = (data.DidNotFollow || {}).value
    this.didNotFollowExplanation = data.DidNotFollowExplanation
  }

  validDidNotFollow() {
    if (!validBranch(this.didNotFollow)) {
      return false
    }

    if (
      this.didNotFollow === 'Yes' &&
      !validGenericTextfield(this.didNotFollowExplanation)
    ) {
      return false
    }

    return true
  }

  validTreatmentList() {
    switch (this.receivedTreatment) {
      case 'No':
        return validGenericTextfield(this.explanation)
      case 'Decline':
        return true
      case 'Yes':
        return validAccordion(this.treatmentList, item => {
          return new ExistingConditionsDiagnosisValidator(item).isValid()
        })
      default:
        return false
    }
  }

  isValid() {
    if (this.hasCondition === 'No') {
      return true
    }
    return this.validDidNotFollow() && this.validTreatmentList()
  }
}
