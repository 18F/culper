import { validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessVotingValidator {
  constructor (data = {}) {
    this.hasForeignVoting = (data.HasForeignVoting || {}).value
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasForeignVoting === 'No') {
      return true
    }

    if (this.hasForeignVoting === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new VotingValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class VotingValidator {
  constructor (data = {}) {
    this.date = data.Date
    this.country = data.Country
    this.reason = data.Reason
    this.eligibility = data.Eligibility
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validCountry () {
    return !!this.country && !!this.country.value
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validEligibility () {
    return !!this.eligibility && validGenericTextfield(this.eligibility)
  }

  isValid () {
    return this.validDate() &&
      this.validCountry() &&
      this.validReason() &&
      this.validEligibility()
  }
}
