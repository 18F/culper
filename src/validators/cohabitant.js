import { validateModel, hasYesOrNo } from 'models/validate'
import cohabitant from 'models/cohabitant'

export const validateCohabitant = data => validateModel(data, cohabitant)

export const validateCohabitants = (data) => {
  const cohabitantsModel = {
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

  return validateModel(data, cohabitantsModel)
}
