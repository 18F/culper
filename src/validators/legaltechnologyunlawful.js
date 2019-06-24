import { validateModel, hasYesOrNo } from 'models/validate'
import unlawfulTech from 'models/unlawfulTech'

export const validateUnlawfulTech = data => (
  validateModel(data, unlawfulTech) === true
)

export const validateLegalTechnologyUnlawful = (data) => {
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

  return validateModel(data, legalTechnologyUnlawfulModel) === true
}

export default class LegalTechnologyUnlawfulValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalTechnologyUnlawful(this.data)
  }
}

export class UnlawfulValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, {
      Date: unlawfulTech.Date,
    }) === true
  }

  validIncident() {
    return validateModel(this.data, {
      Incident: unlawfulTech.Incident,
    }) === true
  }

  validLocation() {
    return validateModel(this.data, {
      Location: unlawfulTech.Location,
    }) === true
  }

  validAction() {
    return validateModel(this.data, {
      Action: unlawfulTech.Action,
    }) === true
  }

  isValid() {
    return validateUnlawfulTech(this.data)
  }
}
