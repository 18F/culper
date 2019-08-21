import { validateModel, hasYesOrNo } from 'models/validate'
import terrorismEngaged from 'models/terrorismEngaged'

export const validateEngaged = data => (
  validateModel(data, terrorismEngaged)
)

export const validateLegalAssociationEngaged = (data) => {
  const legalAssociationEngagedModel = {
    HasEngaged: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasEngaged && attributes.HasEngaged.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: terrorismEngaged },
        }
      }

      return {}
    },
  }

  return validateModel(data, legalAssociationEngagedModel)
}

export default class LegalAssociationEngagedValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalAssociationEngaged(this.data) === true
  }
}

export class EngagedValidator {
  constructor(data = {}) {
    this.data = data
  }

  validReasons() {
    return validateModel(this.data, {
      Reasons: terrorismEngaged.Reasons,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: terrorismEngaged.Dates,
    }) === true
  }

  isValid() {
    return validateEngaged(this.data) === true
  }
}
