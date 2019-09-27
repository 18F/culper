import { hasYesOrNo } from 'models/validate'
import drugUse from 'models/drugUse'

const substanceDrugUsesModel = {
  UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
      return {
        presence: true,
        accordion: {
          validator: drugUse,
        },
      }
    }
    return {}
  },
}

export default substanceDrugUsesModel
