import { hasYesOrNo } from 'models/validate'
import drugVoluntaryTreatment from 'models/drugVoluntaryTreatment'

const substanceDrugVoluntaryTreatmentsModel = {
  TreatmentVoluntary: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.TreatmentVoluntary
      && attributes.TreatmentVoluntary.value === 'Yes') {
      return { presence: true, accordion: { validator: drugVoluntaryTreatment } }
    }
    return {}
  },
}

export default substanceDrugVoluntaryTreatmentsModel
