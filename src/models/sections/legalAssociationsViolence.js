import { hasYesOrNo } from 'models/validate'
import violence from 'models/violence'

const legalViolenceModel = {
  HasViolence: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasViolence && attributes.HasViolence.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: violence },
      }
    }
    return {}
  },
}

export default legalViolenceModel
