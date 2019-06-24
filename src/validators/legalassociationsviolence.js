import { validateModel, hasYesOrNo } from 'models/validate'
import violence from 'models/violence'

export const validateViolence = data => (
  validateModel(data, violence) === true
)

export const validateLegalViolence = (data) => {
  const legalViolenceModel = {
    HasViolence: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasViolence && attributes.HasViolence.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: violence },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalViolenceModel) === true
}

export default class LegalAssociationViolenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalViolence(this.data)
  }
}

export class ViolenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  validOrganization() {
    return validateModel(this.data, {
      Organization: violence.Organization,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: violence.Address,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: violence.Dates,
    }) === true
  }

  validPositions() {
    return validateModel(this.data, {
      Positions: violence.Positions,
    }) === true
  }

  validContributions() {
    return validateModel(this.data, {
      Contributions: violence.Contributions,
    }) === true
  }

  validReasons() {
    return validateModel(this.data, {
      Reasons: violence.Reasons,
    }) === true
  }

  isValid() {
    return validateViolence(this.data)
  }
}
