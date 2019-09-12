import { validateModel, hasYesOrNo } from 'models/validate'
import revoked from 'models/revoked'

export const validateLegalInvestigationsRevoked = (data, formType, options = {}) => {
  const revokedModel = {
    HasRevocations: {
      presence: true,
      hasValue: { validator: hasYesOrNo },
    },
    List: (value, attributes) => {
      // Only required if HasRevocations is yes
      if (attributes.HasRevocations && attributes.HasRevocations.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: revoked },
        }
      }

      return {}
    },
  }

  return validateModel(data, revokedModel, options)
}
