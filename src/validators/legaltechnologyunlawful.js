import { validateModel, hasYesOrNo } from 'models/validate'
import unlawfulTech from 'models/unlawfulTech'

export const validateLegalTechnologyUnlawful = (data, formType, options = {}) => {
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

  return validateModel(data, legalTechnologyUnlawfulModel, options)
}
