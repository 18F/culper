import { validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class LegalInvestigationsRevokedValidator {
  constructor (state = {}, props = {}) {
    this.hasRevocations = props.HasRevocations
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasRevocations === 'No') {
      return true
    }

    if (this.hasRevocations === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new RevokedValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class RevokedValidator {
  constructor (state = {}, props = {}) {
    this.date = props.Date
    this.agency = props.Agency
    this.explanation = props.Explanation
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validAgency () {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validExplanation () {
    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  isValid () {
    return this.validDate() &&
      this.validAgency() &&
      this.validExplanation()
  }
}
