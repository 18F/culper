import { validateModel, hasYesOrNo } from 'models/validate'
import revoked from 'models/revoked'


export const validateLegalInvestigationsRevokedItem = data => (
  validateModel(data, revoked) === true
)

export const validateLegalInvestigationsRevoked = (data) => {
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

  return validateModel(data, revokedModel) === true
}

export default class LegalInvestigationsRevokedValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalInvestigationsRevoked(this.data)
  }
}

export class RevokedItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalInvestigationsRevokedItem(this.data)
  }
}
