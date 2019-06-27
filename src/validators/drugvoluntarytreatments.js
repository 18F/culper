import { validateModel, hasYesOrNo } from 'models/validate'
import drugVoluntaryTreatment from 'models/drugVoluntaryTreatment'

export const validateDrugVoluntaryTreatment = data => (
  validateModel(data, drugVoluntaryTreatment) === true
)

export const validateDrugVoluntaryTreatments = (data) => {
  const drugVoluntaryTreatmentsModel = {
    TreatmentVoluntary: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.TreatmentVoluntary
        && attributes.TreatmentVoluntary.value === 'Yes') {
        return { presence: true, accordion: { validator: drugVoluntaryTreatment } }
      }
      return {}
    },
  }

  return validateModel(data, drugVoluntaryTreatmentsModel) === true
}

export default class DrugVoluntaryTreatmentsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugVoluntaryTreatments(this.data)
  }
}

export class DrugVoluntaryTreatmentValidator {
  constructor(data = {}) {
    this.data = data
  }

  validTreatmentCompleted() {
    return validateModel(this.data, {
      TreatmentCompleted: drugVoluntaryTreatment.TreatmentCompleted,
      NoTreatmentExplanation: drugVoluntaryTreatment.NoTreatmentExplanation,
    }) === true
  }

  isValid() {
    return validateDrugVoluntaryTreatment(this.data)
  }
}
