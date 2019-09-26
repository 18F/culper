import { hasYesOrNo } from 'models/validate'
import drugInvolvement from 'models/drugInvolvement'

const substanceDrugInvolvementsModel = {
  Involved: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.Involved && attributes.Involved.value === 'Yes') {
      return {
        presence: true,
        accordion: {
          validator: drugInvolvement,
        },
      }
    }
    return {}
  },
}

export default substanceDrugInvolvementsModel
