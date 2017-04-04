import DateRangeValidator from './daterange'
import { validNotApplicable, validDateField, validGenericTextfield } from './helpers'

export default class TaxesValidator {
  constructor (state = {}, props = {}) {
    this.hasTaxes = state.HasTaxes
    this.list = state.List || []
  }

  validHasTaxes () {
    if (!this.hasTaxes) {
      return false
    }

    if (!(this.hasTaxes === 'No' || this.hasTaxes === 'Yes')) {
      return false
    }

    return true
  }

  validList () {
    if (this.validHasTaxes() && this.hasTaxes === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    for (const item of this.list) {
      if (new TaxValidator(item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasTaxes() &&
      this.validList()
  }
}

export class TaxValidator {
  constructor (state = {}, props = {}) {
    this.failure = state.Failure
    this.year = state.Year
    this.yearEstimated = state.YearEstimated
    this.reason = state.Reason
    this.agency = state.Agency
    this.taxType = state.TaxType
    this.amount = state.Amount
    this.AmountEstimated = state.AmountEstimated
    this.date = state.Date
    this.dateNotApplicable = state.DateNotApplicable
    this.description = state.Description
  }

  validFailure () {
    return !!this.failure && ['File', 'Pay', 'Both'].includes(this.failure)
  }

  validYear () {
    if (!this.year || isNaN(parseInt(this.year.value)) || ('' + this.year.value).length < 4) {
      return false
    }

    return true
  }

  validReason () {
    return validGenericTextfield(this.reason)
  }

  validAgency () {
    return validGenericTextfield(this.agency)
  }

  validTaxType () {
    return validGenericTextfield(this.taxType)
  }

  validAmount () {
    if (!this.amount || isNaN(parseInt(this.amount.value)) || parseInt(this.amount.value) <= 0) {
      return false
    }

    return true
  }

  validDate () {
    return validNotApplicable(this.dateNotApplicable, () => { return validDateField(this.date) })
  }

  validDescription () {
    return validGenericTextfield(this.description)
  }

  isValid () {
    return this.validFailure() &&
      this.validYear() &&
      this.validReason() &&
      this.validAgency() &&
      this.validTaxType() &&
      this.validAmount() &&
      this.validDate() &&
      this.validDescription()
  }
}
