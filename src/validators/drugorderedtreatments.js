import { validateModel, hasYesOrNo } from 'models/validate'
import drugOrderedTreatment from 'models/drugOrderedTreatment'

export const validateDrugOrderedTreatment = data => (
  validateModel(data, drugOrderedTreatment)
)

export const validateDrugOrderedTreatments = (data) => {
  const drugOrderedTreatmentsModel = {
    TreatmentOrdered: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.TreatmentOrdered
        && attributes.TreatmentOrdered.value === 'Yes') {
        return { presence: true, accordion: { validator: drugOrderedTreatment } }
      }
      return {}
    },
  }

  return validateModel(data, drugOrderedTreatmentsModel)
}

export default class DrugOrderedTreatmentsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugOrderedTreatments(this.data) === true
  }
}

export class DrugOrderedTreatmentValidator {
  constructor(data = {}) {
    this.data = data
  }

  validTreatmentCompleted() {
    return validateModel(this.data, {
      TreatmentCompleted: drugOrderedTreatment.TreatmentCompleted,
      NoTreatmentExplanation: drugOrderedTreatment.NoTreatmentExplanation,
    }) === true
  }

  isValid() {
    return validateDrugOrderedTreatment(this.data) === true
  }
}
