import { hasYesOrNo } from 'models/validate'
import foreignIndirectInterest from 'models/foreignIndirectInterest'

const foreignIndirectActivityModel = {
  HasInterests: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasInterests && attributes.HasInterests.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignIndirectInterest },
      }
    }

    return {}
  },
}

export default foreignIndirectActivityModel
