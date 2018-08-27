import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class ForeignBusinessVotingValidator {
  constructor(data = {}) {
    this.hasForeignVoting = (data.HasForeignVoting || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignVoting === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new VotingValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class VotingValidator {
  constructor(data = {}) {
    this.date = data.Date
    this.country = data.Country
    this.reason = data.Reason
    this.eligibility = data.Eligibility
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validCountry() {
    return !!this.country && !!this.country.value
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validEligibility() {
    return !!this.eligibility && validGenericTextfield(this.eligibility)
  }

  isValid() {
    return (
      this.validDate() &&
      this.validCountry() &&
      this.validReason() &&
      this.validEligibility()
    )
  }
}
