import { validateModel, hasYesOrNo } from 'models/validate'
import financialNonpayment from 'models/financialNonpayment'

const nonpaymentModel = {
  HasNonpayment: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasNonpayment } = attributes
    if (HasNonpayment && HasNonpayment.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialNonpayment },
      }
    }
    return {}
  },
}

export const validateFinancialNonpayment = data => (
  validateModel(data, nonpaymentModel) === true
)

export default class NonpaymentValidator {
  constructor(data = {}) {
    this.data = data
  }

  validHasNonpayment() {
    return validateModel(this.data, { HasNonpayment: nonpaymentModel.HasNonpayment }) === true
  }

  validList() {
    return validateModel(this.data, { List: nonpaymentModel.List }) === true
  }

  isValid() {
    return validateFinancialNonpayment(this.data)
  }
}

const validateNonpaymentItem = data => (
  validateModel(data, financialNonpayment) === true
)

export class NonpaymentItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validName() {
    return validateModel(this.data, { Name: financialNonpayment.Name }) === true
  }

  validInfractions() {
    return validateModel(this.data, { Infractions: financialNonpayment.Infractions }) === true
  }

  validAccountNumber() {
    return validateModel(this.data, { AccountNumber: financialNonpayment.AccountNumber }) === true
  }

  validPropertyType() {
    return validateModel(this.data, { PropertyType: financialNonpayment.PropertyType }) === true
  }

  validAmount() {
    return validateModel(this.data, { Amount: financialNonpayment.Amount }) === true
  }

  validReason() {
    return validateModel(this.data, { Reason: financialNonpayment.Reason }) === true
  }

  validStatus() {
    return validateModel(this.data, { Status: financialNonpayment.Status }) === true
  }

  validDate() {
    return validateModel(this.data, { Date: financialNonpayment.Date }) === true
  }

  validResolved() {
    return validateModel(this.data, { Resolved: financialNonpayment.Resolved }) === true
  }

  validDescription() {
    return validateModel(this.data, { Description: financialNonpayment.Description }) === true
  }

  isValid() {
    return validateNonpaymentItem(this.data)
  }
}
