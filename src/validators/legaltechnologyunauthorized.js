import { validateModel, hasYesOrNo } from 'models/validate'
import unauthorizedTech from 'models/unauthorizedTech'

export const validateUnauthorizedTech = data => (
  validateModel(data, unauthorizedTech)
)

export const validateLegalTechnologyUnauthorized = (data) => {
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

  return validateModel(data, legalTechnologyUnauthorizedModel)
}

export default class LegalTechnologyUnauthorizedValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalTechnologyUnauthorized(this.data) === true
  }
}

export class UnauthorizedValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, {
      Date: unauthorizedTech.Date,
    }) === true
  }

  validIncident() {
    return validateModel(this.data, {
      Incident: unauthorizedTech.Incident,
    }) === true
  }

  validLocation() {
    return validateModel(this.data, {
      Location: unauthorizedTech.Location,
    }) === true
  }

  validAction() {
    return validateModel(this.data, {
      Action: unauthorizedTech.Action,
    }) === true
  }

  isValid() {
    return validateUnauthorizedTech(this.data) === true
  }
}
