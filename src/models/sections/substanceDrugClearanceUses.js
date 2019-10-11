import { hasYesOrNo } from 'models/validate'
import drugClearanceUse from 'models/drugClearanceUse'

const substanceDrugClearanceUsesModel = {
  UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: drugClearanceUse },
      }
    }
    return {}
  },
}

export default substanceDrugClearanceUsesModel
