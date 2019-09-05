import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessAdvice from 'models/foreignBusinessAdvice'

export const validateAdvice = data => validateModel(data, foreignBusinessAdvice)

export const validateForeignBusinessAdvice = (data) => {
  const foreignBusinessAdviceModel = {
    HasForeignAdvice: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignAdvice && attributes.HasForeignAdvice.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessAdvice },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessAdviceModel)
}

export default class ForeignBusinessAdviceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessAdvice(this.data) === true
  }
}

export class AdviceValidator {
  constructor(data = {}) {
    this.data = data
  }

  validDescription() {
    return validateModel(this.data, {
      Description: foreignBusinessAdvice.Description,
    }) === true
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignBusinessAdvice.Name,
    }) === true
  }

  validOrganization() {
    return validateModel(this.data, {
      Organization: foreignBusinessAdvice.Organization,
    }) === true
  }

  validCountry() {
    return validateModel(this.data, {
      Country: foreignBusinessAdvice.Country,
    }) === true
  }

  validDates() {
    return validateModel(this.data, {
      Dates: foreignBusinessAdvice.Dates,
    }) === true
  }

  isValid() {
    return validateAdvice(this.data) === true
  }
}
