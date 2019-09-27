import { hasYesOrNo } from 'models/validate'
import overthrow from 'models/overthrow'

const legalOverthrowModel = {
  HasOverthrow: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasOverthrow && attributes.HasOverthrow.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: overthrow },
      }
    }
    return {}
  },
}

export default legalOverthrowModel
