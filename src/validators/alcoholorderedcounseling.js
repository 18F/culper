import { validateModel, hasYesOrNo } from 'models/validate'
import alcoholOrderedCounseling from 'models/alcoholOrderedCounseling'

export const validateOrderedCounseling = data => (
  validateModel(data, alcoholOrderedCounseling) === true
)

export const validateOrderedCounselings = (data) => {
  const orderedCounselingsModel = {
    HasBeenOrdered: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasBeenOrdered
        && attributes.HasBeenOrdered.value === 'Yes') {
        return { presence: true, accordion: { validator: alcoholOrderedCounseling } }
      }
      return {}
    },
  }

  return validateModel(data, orderedCounselingsModel) === true
}

export default class OrderedCounselingsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateOrderedCounselings(this.data)
  }
}

export class OrderedCounselingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validCompletedTreatment() {
    return validateModel(this.data, {
      CompletedTreatment: alcoholOrderedCounseling.CompletedTreatment,
      NoCompletedTreatmentExplanation: alcoholOrderedCounseling.NoCompletedTreatmentExplanation,
    }) === true
  }

  isValid() {
    return validateOrderedCounseling(this.data)
  }
}
