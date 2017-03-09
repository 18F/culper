import NameValidator from './name'
import AddressValidator from './address'
import { validGenericMonthYear, validGenericTextfield } from './helpers'

/**
 * Validates an entire Bankruptcy section
 */
export default class BankruptcyValidator {
  constructor (state, props) {
    this.hasBankruptcy = state.HasBankruptcy
    this.list = state.List
  }

  /**
   * Validates the yes/no branching for bankruptcy
   */
  validHasBankruptcy () {
    if (!this.hasBankruptcy) {
      return false
    }

    if (!(this.hasBankruptcy === 'Yes' || this.hasBankruptcy === 'No')) {
      return false
    }

    return true
  }

  validBankruptcies () {
    if (this.validHasBankruptcy() && this.hasBankruptcy === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    for (const item of this.list) {
      const result = new BankruptcyItemValidator(item, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  /**
   * Validates all bankruptcy items
   */
  isValid () {
    return this.validHasBankruptcy() &&
      this.validBankruptcies()
  }
}

/**
 * Helper for validating single instances of a bankruptcy item
 */
export class BankruptcyItemValidator {
  constructor (state, props) {
    this.petitionType = state.PetitionType
    this.courtAddress = state.CourtAddress
    this.courtInvolved = state.CourtInvolved
    this.courtNumber = state.CourtNumber
    this.nameDebt = state.NameDebt
    this.totalAmount = state.TotalAmount
    this.dateFiled = state.DateFiled
    this.dateDischarged = state.DateDischarged
  }

  validPetitionType () {
    if (!this.petitionType || !this.petitionType.value) {
      return false
    }
    return true
  }

  validCourtAddress () {
    return new AddressValidator(this.courtAddress).isValid()
  }

  validCourtInvolved () {
    return validGenericTextfield(this.courtInvolved)
  }

  validCourtNumber () {
    return validGenericTextfield(this.courtNumber)
  }

  validTotalAmount () {
    return validGenericTextfield(this.totalAmount)
  }

  validDateFiled () {
    return validGenericMonthYear(this.dateFiled)
  }

  validDateDischarged () {
    return validGenericMonthYear(this.dateDischarged)
  }

  validName () {
    return new NameValidator(this.nameDebt, null).isValid()
  }

  isValid () {
    return this.validCourtInvolved() &&
      this.validCourtNumber() &&
      this.validTotalAmount() &&
      this.validDateFiled() &&
      this.validDateDischarged() &&
      this.validName()
  }
}
