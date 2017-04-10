import DiagnosisValidator from './diagnosis'
import { validGenericTextfield, validBranch } from './helpers'

export default class ExistingConditionsValidator {
  constructor (state = {}, props) {
    this.hasCondition = state.HasCondition
    this.receivedTreatment = state.ReceivedTreatment
    this.treatmentList = state.TreatmentList || []
    this.didNotFollow = state.DidNotFollow
    this.explanation = state.Explanation
  }

  validReceivedTreatment () {
    if (!['Yes', 'No', 'Decline'].includes(this.receivedTreatment)) {
      return false
    }

    if (this.receivedTreatment === 'No' && !validGenericTextfield(this.explanation)) {
      return false
    }
    return true
  }

  validTreatmentList () {
    if (this.receivedTreatment === 'No') {
      return true
    }

    if (this.receivedTreatment === 'Yes' && this.treatmentList.length === 0) {
      return false
    }

    for (let item of this.treatmentList) {
      if (!new DiagnosisValidator(item.Treatment).isValid()) {
        return false
      }
    }
    return true
  }

  isValid () {
    return validBranch(this.hasCondition) &&
      this.validReceivedTreatment() &&
      validBranch(this.didNotFollow) &&
      this.validTreatmentList()
  }
}
