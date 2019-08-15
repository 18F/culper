import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessEmployment from 'models/foreignBusinessEmployment'

export const validateForeignBusinessEmploymentItem = data => (
  validateModel(data, foreignBusinessEmployment)
)

export const validateForeignBusinessEmployment = (data) => {
  const foreignBusinessEmploymentModel = {
    HasForeignEmployment: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignEmployment && attributes.HasForeignEmployment.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessEmployment },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessEmploymentModel)
}

export default class ForeignBusinessEmploymentValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBusinessEmployment(this.data) === true
  }
}

export class ForeignBusinessEmploymentItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, {
      Name: foreignBusinessEmployment.Name,
    }) === true
  }

  validDescription() {
    return validateModel(this.data, {
      Description: foreignBusinessEmployment.Description,
    }) === true
  }

  validDate() {
    return validateModel(this.data, {
      Date: foreignBusinessEmployment.Date,
    }) === true
  }

  validAddress() {
    return validateModel(this.data, {
      Address: foreignBusinessEmployment.Address,
    }) === true
  }

  validAcceptance() {
    return validateModel(this.data, {
      Accepted: foreignBusinessEmployment.Accepted,
      Explanation: foreignBusinessEmployment.Explanation,
    }) === true
  }

  isValid() {
    return validateForeignBusinessEmploymentItem(this.data) === true
  }
}
