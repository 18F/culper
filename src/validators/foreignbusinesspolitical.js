import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessPolitical from 'models/foreignBusinessPolitical'

export const validatePolitical = data => validateModel(data, foreignBusinessPolitical)

export const validateForeignBusinessPolitical = (data) => {
  const foreignBusinessPoliticalModel = {
    HasForeignPolitical: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignPolitical && attributes.HasForeignPolitical.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessPolitical },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessPoliticalModel)
}

export default class ForeignBusinessPoliticalValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessPolitical(this.data) === true
  }
}

export class PoliticalValidator {
  constructor(data = {}) {
    this.data = data
  }

  validPosition() {
    return validateModel(this.data, {
      Position: foreignBusinessPolitical.Position,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignBusinessPolitical.Dates,
    }) === true
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignBusinessPolitical.Country,
    }) === true
  }

  validReason() {
    return validateModel(this.data, {
      Reason: foreignBusinessPolitical.Reason,
    }) === true
  }

  validEligibility() {
    return validateModel(this.data, {
      Eligibility: foreignBusinessPolitical.Eligibility,
    }) === true
  }

  isValid() {
    return validatePolitical(this.data) === true
  }
}
