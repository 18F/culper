import { validateModel, hasYesOrNo } from 'models/validate'
import terrorismAdvocate from 'models/terrorismAdvocate'

export const validateAdvocate = data => (
  validateModel(data, terrorismAdvocate)
)

export const validateLegalAssociationAdvocate = (data, formType, options = {}) => {
  const legalAssociationAdvocateModel = {
    HasAdvocated: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasAdvocated && attributes.HasAdvocated.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: terrorismAdvocate },
        }
      }

      return {}
    },
  }

  return validateModel(data, legalAssociationAdvocateModel, options)
}

export default class LegalAssociationAdvocatingValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalAssociationAdvocate(this.data) === true
  }
}

export class AdvocatingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validReasons() {
    return validateModel(this.data, {
      Reasons: terrorismAdvocate.Reasons,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: terrorismAdvocate.Dates,
    }) === true
  }

  isValid() {
    return validateAdvocate(this.data) === true
  }
}
