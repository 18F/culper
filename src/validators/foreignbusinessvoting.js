import { validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessVotingValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignVoting = props.HasForeignVoting
    this.list = props.List || []
    this.listBranch = props.ListBranch
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

      return this.list.every(item => new VotingValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class VotingValidator {
  constructor (state = {}, props = {}) {
    this.date = props.Date
    this.country = props.Country
    this.reason = props.Reason
    this.eligibility = props.Eligibility
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
