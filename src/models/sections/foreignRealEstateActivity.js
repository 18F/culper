import { hasYesOrNo } from 'models/validate'
import foreignRealEstateInterest from 'models/foreignRealEstateInterest'

const foreignRealEstateActivityModel = {
  HasInterests: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasInterests && attributes.HasInterests.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignRealEstateInterest },
      }
    }

    return {}
  },
}

export default foreignRealEstateActivityModel
