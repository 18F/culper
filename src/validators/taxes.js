import {
  validAccordion,
  validNotApplicable,
  validDateField,
  validGenericTextfield
} from './helpers'

export default class TaxesValidator {
  constructor(data = {}) {
    this.hasTaxes = (data.HasTaxes || {}).value
    this.list = data.List || {}
  }

  validHasTaxes() {
    if (!this.hasTaxes) {
      return false
    }

    if (!(this.hasTaxes === 'No' || this.hasTaxes === 'Yes')) {
      return false
    }

    return true
  }

  validList() {
    if (this.validHasTaxes() && this.hasTaxes === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new TaxValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasTaxes() && this.validList()
  }
}

export class TaxValidator {
  constructor(data = {}) {
    this.failure = data.Failure
    this.year = data.Year
    this.yearEstimated = data.YearEstimated
    this.reason = data.Reason
    this.agency = data.Agency
    this.taxType = data.TaxType
    this.amount = data.Amount
    this.amountEstimated = data.AmountEstimated
    this.date = data.Date
    this.dateNotApplicable = data.DateNotApplicable
    this.description = data.Description
  }

  validFailure() {
    return (
      !!this.failure && ['File', 'Pay', 'Both'].includes(this.failure.value)
    )
  }

  validYear() {
    if (
      !this.year ||
      isNaN(parseInt(this.year.year)) ||
      ('' + this.year.year).length < 4
    ) {
      return false
    }

    return true
  }

  validReason() {
    return validGenericTextfield(this.reason)
  }

  validAgency() {
    return validGenericTextfield(this.agency)
  }

  validTaxType() {
    return validGenericTextfield(this.taxType)
  }

  validAmount() {
    if (
      !this.amount ||
      isNaN(parseInt(this.amount.value)) ||
      parseInt(this.amount.value) <= 0
    ) {
      return false
    }

    return true
  }

  validDate() {
    return validNotApplicable(this.dateNotApplicable, () => {
      return validDateField(this.date)
    })
  }

  validDescription() {
    return validGenericTextfield(this.description)
  }

  isValid() {
    return (
      this.validFailure() &&
      this.validYear() &&
      this.validReason() &&
      this.validAgency() &&
      this.validTaxType() &&
      this.validAmount() &&
      this.validDate() &&
      this.validDescription()
    )
  }
}
