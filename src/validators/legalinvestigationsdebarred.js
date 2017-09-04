import { validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class LegalInvestigationsDebarredValidator {
  constructor (data = {}) {
    this.hasDebarment = data.HasDebarment
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasDebarment === 'No') {
      return true
    }

    if (this.hasDebarment === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new DebarredValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class DebarredValidator {
  constructor (data = {}) {
    this.agency = data.Agency
    this.date = data.Date
    this.explanation = data.Explanation
  }

  validAgency () {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validExplanation () {
    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  isValid () {
    return this.validAgency() &&
      this.validDate() &&
      this.validExplanation()
  }
}
