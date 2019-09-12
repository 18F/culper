import { validateModel, hasYesOrNo } from 'models/validate'
import manipulatingTech from 'models/manipulatingTech'

export const validateLegalTechnologyManipulating = (data, formType, options = {}) => {
  const legalTechnologyManipulatingModel = {
    HasManipulating: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasManipulating && attributes.HasManipulating.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: manipulatingTech },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalTechnologyManipulatingModel, options)
}
