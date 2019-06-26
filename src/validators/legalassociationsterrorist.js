import { validateModel, hasYesOrNo } from 'models/validate'
import terrorist from 'models/terrorist'

export const validateTerrorist = data => (
  validateModel(data, terrorist) === true
)

export const validateLegalTerrorist = (data) => {
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

  return validateModel(data, legalTerroristModel) === true
}

export default class LegalTerroristValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalTerrorist(this.data)
  }
}

export class TerroristValidator {
  constructor(data = {}) {
    this.data = data
  }

  validOrganization() {
    return validateModel(this.data, {
      Organization: terrorist.Organization,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: terrorist.Address,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: terrorist.Dates,
    }) === true
  }

  validPositions() {
    return validateModel(this.data, {
      Positions: terrorist.Positions,
    }) === true
  }

  validContributions() {
    return validateModel(this.data, {
      Contributions: terrorist.Contributions,
    }) === true
  }

  validReasons() {
    return validateModel(this.data, {
      Reasons: terrorist.Reasons,
    }) === true
  }

  isValid() {
    return validateTerrorist(this.data)
  }
}
