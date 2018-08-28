import NameValidator from './name'
import LocationValidator from './location'
import {
  validAccordion,
  validGenericMonthYear,
  validGenericTextfield,
  validBranch
} from './helpers'

/**
 * Validates an entire Bankruptcy section
 */
export default class BankruptcyValidator {
  constructor(data = {}) {
    this.hasBankruptcy = (data.HasBankruptcy || {}).value
    this.list = data.List || {}
  }

  /**
   * Validates the yes/no branching for bankruptcy
   */
  validHasBankruptcy() {
    if (!this.hasBankruptcy) {
      return false
    }

    if (!(this.hasBankruptcy === 'Yes' || this.hasBankruptcy === 'No')) {
      return false
    }

    return true
  }

  validBankruptcies() {
    if (this.validHasBankruptcy() && this.hasBankruptcy === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new BankruptcyItemValidator(item).isValid()
    })
  }

  /**
   * Validates all bankruptcy items
   */
  isValid() {
    return this.validHasBankruptcy() && this.validBankruptcies()
  }
}

/**
 * Helper for validating single instances of a bankruptcy item
 */
export class BankruptcyItemValidator {
  constructor(data = {}) {
    this.petitionType = data.PetitionType
    this.courtAddress = data.CourtAddress
    this.courtInvolved = data.CourtInvolved
    this.courtNumber = data.CourtNumber
    this.nameDebt = data.NameDebt
    this.totalAmount = data.TotalAmount
    this.dateFiled = data.DateFiled
    this.dateDischarged = data.DateDischarged
    this.dateDischargedNotApplicable = data.DateDischargedNotApplicable
    this.hasDischargeExplanation = (data.HasDischargeExplanation || {}).value
    this.dischargeExplanation = data.DischargeExplanation
    this.trustee = data.Trustee
    this.trusteeAddress = data.TrusteeAddress
  }

  validPetitionType() {
    switch ((this.petitionType || {}).value) {
      case 'Chapter7':
      case 'Chapter11':
      case 'Chapter12':
        return true
      case 'Chapter13':
        return (
          validGenericTextfield(this.trustee) &&
          new LocationValidator(this.trusteeAddress).isValid()
        )
      default:
        return false
    }
  }

  validCourtAddress() {
    return new LocationValidator(this.courtAddress).isValid()
  }

  validCourtInvolved() {
    return validGenericTextfield(this.courtInvolved)
  }

  validCourtNumber() {
    return validGenericTextfield(this.courtNumber)
  }

  validTotalAmount() {
    return validGenericTextfield(this.totalAmount)
  }

  validDateFiled() {
    return validGenericMonthYear(this.dateFiled)
  }

  validDateDischarged() {
    if (
      this.dateDischargedNotApplicable &&
      !this.dateDischargedNotApplicable.applicable
    ) {
      return true
    }

    return validGenericMonthYear(this.dateDischarged)
  }

  validName() {
    return new NameValidator(this.nameDebt).isValid()
  }

  validDischargeExplanation() {
    return (
      validBranch(this.hasDischargeExplanation) &&
      validGenericTextfield(this.dischargeExplanation)
    )
  }

  isValid() {
    return (
      this.validCourtInvolved() &&
      this.validCourtNumber() &&
      this.validTotalAmount() &&
      this.validDateFiled() &&
      this.validDateDischarged() &&
      this.validDischargeExplanation() &&
      this.validName() &&
      this.validPetitionType()
    )
  }
}
