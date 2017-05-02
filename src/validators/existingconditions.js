import DiagnosisValidator from './diagnosis'
import { validGenericTextfield, validBranch } from './helpers'

export default class ExistingConditionsValidator {
  constructor (state = {}, props) {
    this.hasCondition = state.HasCondition
    this.receivedTreatment = state.ReceivedTreatment
    this.explanation = state.Explanation
    this.treatmentList = state.TreatmentList || []
    this.didNotFollow = state.DidNotFollow
    this.didNotFollowExplanation = state.DidNotFollowExplanation
    this.prefix = (props || {}).prefix
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
    if (this.receivedTreatment === 'No' || this.receivedTreatment === 'Decline') {
      return true
    }

    if (this.receivedTreatment === 'Yes' && this.treatmentList.length === 0) {
      return false
    }

    for (let item of this.treatmentList) {
      if (!new DiagnosisValidator(item.Treatment, { prefix: this.prefix }).isValid()) {
        return false
      }
    }
    return true
  }

  isValid () {
    return validBranch(this.hasCondition) &&
      this.validReceivedTreatment() &&
      this.validDidNotFollow() &&
      this.validTreatmentList()
  }
}
