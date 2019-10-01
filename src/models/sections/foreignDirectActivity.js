import { hasYesOrNo } from 'models/validate'
import foreignDirectInterest from 'models/foreignDirectInterest'

const foreignDirectActivityModel = {
  HasInterests: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasInterests && attributes.HasInterests.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignDirectInterest },
      }
    }

    return {}
  },
}

export default foreignDirectActivityModel
