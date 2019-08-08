import { validateModel } from 'models/validate'
import existingConditions from 'models/existingConditions'

export const validateExistingConditions = data => (
  validateModel(data, existingConditions)
)

export default class ExistingConditionsValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDidNotFollow() {
    return validateModel(this.data, {
      DidNotFollow: existingConditions.DidNotFollow,
      DidNotFollowExplanation: existingConditions.DidNotFollowExplanation,
    }) === true
  }

  validTreatmentList() {
    return validateModel(this.data, {
      ReceivedTreatment: existingConditions.ReceivedTreatment,
      Explanation: existingConditions.Explanation,
      TreatmentList: existingConditions.TreatmentList,
    }) === true
  }

  isValid() {
    return validateModel(this.data, existingConditions) === true
  }
}
