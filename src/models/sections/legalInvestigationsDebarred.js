import { hasYesOrNo } from 'models/validate'
import debarred from 'models/debarred'

const legalInvestigationsDebarredModel = {
  HasDebarment: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasDebarment && attributes.HasDebarment.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: debarred },
      }
    }
    return {}
  },
}

export default legalInvestigationsDebarredModel
