import { validateModel, hasYesOrNo } from 'models/validate'
import financialBankruptcy from 'models/financialBankruptcy'

const financialBankruptcyModel = {
  HasBankruptcy: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    const { HasBankruptcy } = attributes
    if (HasBankruptcy && HasBankruptcy.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialBankruptcy },
      }
    }
    return {}
  },
}

const validateFinancialBankruptcy = data => (
  validateModel(data, financialBankruptcyModel) === true
)

/**
 * Validates an entire Bankruptcy section
 */
export default class BankruptcyValidator {
  constructor(data = {}) {
    this.data = data
  }

  /**
   * Validates the yes/no branching for bankruptcy
   */
  validHasBankruptcy() {
    return validateModel(this.data, { HasBankruptcy: financialBankruptcyModel.HasBankruptcy }) === true
  }

  validBankruptcies() {
    return validateModel(this.data, { List: financialBankruptcyModel.List }) === true
  }

  /**
   * Validates all bankruptcy items
   */
  isValid() {
    return validateFinancialBankruptcy(this.data)
  }
}

/**
 * Helper for validating single instances of a bankruptcy item
 */
export class BankruptcyItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  validPetitionType() {
    return validateModel(this.data, { PetitionType: financialBankruptcy.PetitionType }) === true
  }

  validCourtAddress() {
    return validateModel(this.data, { CourtAddress: financialBankruptcy.CourtAddress }) === true
  }

  validCourtInvolved() {
    return validateModel(this.data, { CourtInvolved: financialBankruptcy.CourtInvolved }) === true
  }

  validCourtNumber() {
    return validateModel(this.data, { CourtNumber: financialBankruptcy.CourtNumber }) === true
  }

  validTotalAmount() {
    return validateModel(this.data, { TotalAmount: financialBankruptcy.TotalAmount }) === true
  }

  validDateFiled() {
    return validateModel(this.data, { DateFiled: financialBankruptcy.DateFiled }) === true
  }

  validDateDischarged() {
    return validateModel(this.data, { DateDischarged: financialBankruptcy.DateDischarged }) === true
  }

  validName() {
    return validateModel(this.data, { NameDebt: financialBankruptcy.NameDebt }) === true
  }

  validDischargeExplanation() {
    return validateModel(this.data, { DischargeExplanation: financialBankruptcy.DischargeExplanation }) === true
  }

  isValid() {
    return validateModel(this.data, financialBankruptcy) === true
  }
}
