import { validateModel, hasYesOrNo } from 'models/validate'
import drugVoluntaryTreatment from 'models/drugVoluntaryTreatment'

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

  return validateModel(data, drugVoluntaryTreatmentsModel)
}
