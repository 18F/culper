import { hasYesOrNo } from 'models/validate'
import unlawfulTech from 'models/unlawfulTech'

const legalTechnologyUnlawfulModel = {
  HasUnlawful: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasUnlawful && attributes.HasUnlawful.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: unlawfulTech },
      }
    }
    return {}
  },
}

export default legalTechnologyUnlawfulModel
