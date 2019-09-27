import { hasYesOrNo } from 'models/validate'
import alcoholOrderedCounseling from 'models/alcoholOrderedCounseling'

const substanceAlcoholOrderedCounselingModel = {
  HasBeenOrdered: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasBeenOrdered
      && attributes.HasBeenOrdered.value === 'Yes') {
      return { presence: true, accordion: { validator: alcoholOrderedCounseling } }
    }
    return {}
  },
}

export default substanceAlcoholOrderedCounselingModel
