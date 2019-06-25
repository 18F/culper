import { validateModel, hasYesOrNo } from 'models/validate'
import manipulatingTech from 'models/manipulatingTech'

export const validateManipulatingTech = data => (
  validateModel(data, manipulatingTech) === true
)

export const validateLegalTechnologyManipulating = (data) => {
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

  return validateModel(data, legalTechnologyManipulatingModel) === true
}

export default class LegalTechnologyManipulatingValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalTechnologyManipulating(this.data)
  }
}

export class ManipulatingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDate() {
    return validateModel(this.data, {
      Date: manipulatingTech.Date,
    }) === true
  }

  validIncident() {
    return validateModel(this.data, {
      Incident: manipulatingTech.Incident,
    }) === true
  }

  validLocation() {
    return validateModel(this.data, {
      Location: manipulatingTech.Location,
    }) === true
  }

  validAction() {
    return validateModel(this.data, {
      Action: manipulatingTech.Action,
    }) === true
  }

  isValid() {
    return validateManipulatingTech(this.data)
  }
}
