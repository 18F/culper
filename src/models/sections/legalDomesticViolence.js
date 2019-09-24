import { hasYesOrNo } from 'models/validate'
import domesticViolence from 'models/domesticViolence'

const domesticViolenceModel = {
  HasDomesticViolence: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasDomesticViolence && attributes.HasDomesticViolence.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: domesticViolence },
      }
    }

    return {}
  },
}

export default domesticViolenceModel
