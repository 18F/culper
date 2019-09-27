import { hasYesOrNo } from 'models/validate'
import unauthorizedTech from 'models/unauthorizedTech'

const legalTechnologyUnauthorizedModel = {
  HasUnauthorized: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasUnauthorized && attributes.HasUnauthorized.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: unauthorizedTech },
      }
    }
    return {}
  },
}

export default legalTechnologyUnauthorizedModel
