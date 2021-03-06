import { hasYesOrNo } from 'models/validate'
import cohabitant from 'models/cohabitant'

const relationshipsCohabitantsModel = {
  HasCohabitant: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  CohabitantList: (value, attributes) => {
    if (attributes.HasCohabitant && attributes.HasCohabitant.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: cohabitant },
      }
    }

    return {}
  },
}

export default relationshipsCohabitantsModel
