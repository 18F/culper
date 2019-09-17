import { validateModel, hasYesOrNo } from 'models/validate'
import terrorist from 'models/terrorist'

export const validateLegalTerrorist = (data, formType, options = {}) => {
  const legalTerroristModel = {
    HasTerrorist: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasTerrorist && attributes.HasTerrorist.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: terrorist },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalTerroristModel, options)
}
