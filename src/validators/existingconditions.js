import { ExistingConditionsDiagnosisValidator } from './diagnosis'
import { validGenericTextfield, validBranch } from './helpers'

export default class ExistingConditionsValidator {
  constructor (data = {}) {
    this.hasCondition = data.HasCondition
    this.receivedTreatment = data.ReceivedTreatment
    this.explanation = data.Explanation
    this.treatmentList = data.TreatmentList || []
    this.treatmentListBranch = data.TreatmentListBranch
    this.didNotFollow = data.DidNotFollow
    this.didNotFollowExplanation = data.DidNotFollowExplanation
  }

  validDidNotFollow () {
    if (!validBranch(this.didNotFollow)) {
      return false
    }

    if (this.didNotFollow === 'Yes' && !validGenericTextfield(this.didNotFollowExplanation)) {
      return false
    }

    return true
  }

  validTreatmentList () {
    switch (this.receivedTreatment) {
      case 'No':
        return validGenericTextfield(this.explanation)
      case 'Decline':
        return true
      case 'Yes':
        if (this.treatmentListBranch !== 'No') {
          return false
        }
        if (this.receivedTreatment === 'Yes' && this.treatmentList.length === 0) {
          return false
        }
        for (let item of this.treatmentList) {
          if (!new ExistingConditionsDiagnosisValidator(item.Item).isValid()) {
            return false
          }
        }
        return true
      default:
        return false
    }
  }

  isValid () {
    if (this.hasCondition === 'No') {
      return true
    }
    return this.validDidNotFollow() &&
      this.validTreatmentList()
  }
}
