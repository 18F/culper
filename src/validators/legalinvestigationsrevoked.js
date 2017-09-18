import { validGenericTextfield, validDateField } from './helpers'

export default class LegalInvestigationsRevokedValidator {
  constructor (data = {}) {
    this.hasRevocations = data.HasRevocations
    this.list = data.List || []
    this.listBranch = data.ListBranch
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

      return this.list.every(item => new RevokedValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class RevokedValidator {
  constructor (data = {}) {
    this.date = data.Date
    this.agency = data.Agency
    this.explanation = data.Explanation
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
