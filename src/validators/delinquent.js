import LocationValidator from './location'
import {
  validAccordion,
  validNotApplicable,
  validDateField,
  validGenericTextfield
} from './helpers'

export default class DelinquentValidator {
  constructor(data = {}) {
    this.hasDelinquent = (data.HasDelinquent || {}).value
    this.list = data.List || {}
  }

  validHasDelinquent() {
    if (!this.hasDelinquent) {
      return false
    }

    if (!(this.hasDelinquent === 'No' || this.hasDelinquent === 'Yes')) {
      return false
    }

    return true
  }

  validList() {
    if (this.validHasDelinquent() && this.hasDelinquent === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DelinquentItemValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasDelinquent() && this.validList()
  }
}

export class DelinquentItemValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.infractions = data.Infractions || []
    this.accountNumber = data.AccountNumber
    this.propertyType = data.PropertyType
    this.amount = data.Amount
    this.amountEstimated = data.AmountEstimated
    this.reason = data.Reason
    this.status = data.Status
    this.date = data.Date
    this.resolved = data.Resolved
    this.resolvedNotApplicable = data.ResolvedNotApplicable
    this.courtName = data.CourtName
    this.courtAddress = data.CourtAddress
    this.description = data.Description
  }

  validName() {
    return !!this.name && validGenericTextfield(this.name)
  }

  validInfractions() {
    const allowed = ['Alimony', 'Judgement', 'Lien', 'Federal']
    return (
      !!this.infractions &&
      this.infractions.length > 0 &&
      this.infractions.every(x => {
        return allowed.includes(x)
      })
    )
  }

  validAccountNumber() {
    return !!this.accountNumber && validGenericTextfield(this.accountNumber)
  }

  validPropertyType() {
    // This is an optional value at the moment
    return true
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

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validStatus() {
    return !!this.status && validGenericTextfield(this.status)
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validResolved() {
    return validNotApplicable(this.resolvedNotApplicable, () => {
      return validDateField(this.resolved)
    })
  }

  validCourtName() {
    return !!this.courtName && validGenericTextfield(this.courtName)
  }

  validCourtAddress() {
    return (
      !!this.courtAddress && new LocationValidator(this.courtAddress).isValid()
    )
  }

  validDescription() {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid() {
    return (
      this.validName() &&
      this.validAccountNumber() &&
      this.validPropertyType() &&
      this.validAmount() &&
      this.validReason() &&
      this.validStatus() &&
      this.validDate() &&
      this.validResolved() &&
      this.validCourtName() &&
      this.validCourtAddress() &&
      this.validDescription()
    )
  }
}
