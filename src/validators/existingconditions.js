import DiagnosisValidator from './diagnosis'
import { validGenericTextfield, validBranch } from './helpers'

export default class ExistingConditionsValidator {
  constructor (state = {}, props) {
    this.hasCondition = state.HasCondition
    this.receivedTreatment = state.ReceivedTreatment
    this.explanation = state.Explanation
    this.treatmentList = state.TreatmentList || []
    this.treatmentListBranch = state.TreatmentListBranch
    this.didNotFollow = state.DidNotFollow
    this.didNotFollowExplanation = state.DidNotFollowExplanation
    this.prefix = (props || {}).prefix
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
          if (!new DiagnosisValidator(item.Diagnosis, { prefix: this.prefix }).isValid()) {
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
