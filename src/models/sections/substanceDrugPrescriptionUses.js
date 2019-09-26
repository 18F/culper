import { hasYesOrNo } from 'models/validate'
import drugPrescriptionUse from 'models/drugPrescriptionUse'

const substanceDrugPrescriptionUsesModel = {
  MisusedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.MisusedDrugs && attributes.MisusedDrugs.value === 'Yes') {
      return {
        presence: true,
        accordion: {
          validator: drugPrescriptionUse,
        },
      }
    }
    return {}
  },
}

export default substanceDrugPrescriptionUsesModel
