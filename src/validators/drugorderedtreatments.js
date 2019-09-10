import { validateModel, hasYesOrNo } from 'models/validate'
import drugOrderedTreatment from 'models/drugOrderedTreatment'

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
