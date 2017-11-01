import NameValidator from './name'
import LocationValidator from './location'
import { validGenericMonthYear, validGenericTextfield, validBranch } from './helpers'

/**
 * Validates an entire Bankruptcy section
 */
export default class BankruptcyValidator {
  constructor (data = {}) {
    this.hasBankruptcy = data.HasBankruptcy
    this.list = data.List
    this.listBranch = data.ListBranch
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

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new BankruptcyItemValidator(item.Item).isValid()
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
  constructor (data = {}) {
    this.petitionType = data.PetitionType
    this.courtAddress = data.CourtAddress
    this.courtInvolved = data.CourtInvolved
    this.courtNumber = data.CourtNumber
    this.nameDebt = data.NameDebt
    this.totalAmount = data.TotalAmount
    this.dateFiled = data.DateFiled
    this.dateDischarged = data.DateDischarged
    this.dateDischargedNotApplicable = data.DateDischargedNotApplicable
    this.hasDischargeExplanation = data.HasDischargeExplanation
    this.dischargeExplanation = data.DischargeExplanation
    this.trustee = data.Trustee
    this.trusteeAddress = data.TrusteeAddress
  }

  validPetitionType () {
    switch (this.petitionType) {
      case 'Chapter7':
      case 'Chapter11':
      case 'Chapter12':
        return true
      case 'Chapter13':
        return validGenericTextfield(this.trustee) &&
          new LocationValidator(this.trusteeAddress).isValid()
      default:
        return false
    }
  }

  validCourtAddress () {
    return new LocationValidator(this.courtAddress).isValid()
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
    if (this.dateDischargedNotApplicable && !this.dateDischargedNotApplicable.applicable) {
      return true
    }

    return validGenericMonthYear(this.dateDischarged)
  }

  validName () {
    return new NameValidator(this.nameDebt, null).isValid()
  }

  validDischargeExplanation () {
    return validBranch(this.hasDischargeExplanation) &&
      validGenericTextfield(this.dischargeExplanation)
  }

  isValid () {
    return this.validCourtInvolved() &&
      this.validCourtNumber() &&
      this.validTotalAmount() &&
      this.validDateFiled() &&
      this.validDateDischarged() &&
      this.validDischargeExplanation() &&
      this.validName() &&
      this.validPetitionType()
  }
}
