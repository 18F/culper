import { hasYesOrNo } from 'models/validate'
import alcoholNegativeImpact from 'models/alcoholNegativeImpact'

const substanceAlcoholNegativeImpactsModel = {
  HasImpacts: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasImpacts && attributes.HasImpacts.value === 'Yes') {
      return { presence: true, accordion: { validator: alcoholNegativeImpact } }
    }
    return {}
  },
}

export default substanceAlcoholNegativeImpactsModel
