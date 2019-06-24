import { validateModel, hasYesOrNo } from 'models/validate'
import overthrow from 'models/overthrow'

export const validateOverthrow = data => (
  validateModel(data, overthrow) === true
)

export const validateLegalOverthrow = (data) => {
  const legalOverthrowModel = {
    HasOverthrow: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasOverthrow && attributes.HasOverthrow.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: overthrow },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalOverthrowModel) === true
}

export default class LegalAssociationOverthrowValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalOverthrow(this.data)
  }
}

export class OverthrowValidator {
  constructor(data = {}) {
    this.data = data
  }

  validOrganization() {
    return validateModel(this.data, {
      Organization: overthrow.Organization,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: overthrow.Address,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: overthrow.Dates,
    }) === true
  }

  validPositions() {
    return validateModel(this.data, {
      Positions: overthrow.Positions,
    }) === true
  }

  validContributions() {
    return validateModel(this.data, {
      Contributions: overthrow.Contributions,
    }) === true
  }

  validReasons() {
    return validateModel(this.data, {
      Reasons: overthrow.Reasons,
    }) === true
  }

  isValid() {
    return validateOverthrow(this.data)
  }
}
