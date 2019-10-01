import { hasYesOrNo } from 'models/validate'
import drugOrderedTreatment from 'models/drugOrderedTreatment'

const substanceDrugOrderedTreatmentsModel = {
  TreatmentOrdered: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.TreatmentOrdered
      && attributes.TreatmentOrdered.value === 'Yes') {
      return { presence: true, accordion: { validator: drugOrderedTreatment } }
    }
    return {}
  },
}

export default substanceDrugOrderedTreatmentsModel
