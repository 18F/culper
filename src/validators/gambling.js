import { validateModel, hasYesOrNo } from 'models/validate'
import financialGambling from 'models/financialGambling'

const financialGamblingModel = {
  HasGamblingDebt: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasGamblingDebt } = attributes
    if (HasGamblingDebt && HasGamblingDebt.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialGambling },
      }
    }
    return {}
  },
}

export const validateFinancialGambling = data => (
  validateModel(data, financialGamblingModel) === true
)

export default class GamblingValidator {
  constructor(data = {}) {
    this.data = data
  }

  validHasGamblingDebt() {
    return validateModel(this.data, {
      HasGamblingDebt: financialGamblingModel.HasGamblingDebt,
    }) === true
  }

  /**
   * Validates all fields for a collection of gambling debt
   */
  validGamblingDebt() {
    return validateModel(this.data, { List: financialGamblingModel.List }) === true
  }

  /**
   * Validates section of gambling debt
   */
  isValid() {
    return validateFinancialGambling(this.data)
  }
}

export const validateFinancialGamblingItem = data => (
  validateModel(data, financialGambling) === true
)

export class GamblingItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateFinancialGamblingItem(this.data)
  }
}
