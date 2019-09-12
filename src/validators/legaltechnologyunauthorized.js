import { validateModel, hasYesOrNo } from 'models/validate'
import unauthorizedTech from 'models/unauthorizedTech'

export const validateLegalTechnologyUnauthorized = (data, formType, options = {}) => {
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

  return validateModel(data, legalTechnologyUnauthorizedModel, options)
}
