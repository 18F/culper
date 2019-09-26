import { hasYesOrNo } from 'models/validate'
import drugSafetyUse from 'models/drugSafetyUse'

const substanceDrugPublicSafetyUsesModel = {
  UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: drugSafetyUse },
      }
    }
    return {}
  },
}

export default substanceDrugPublicSafetyUsesModel
