import { validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class LegalInvestigationsDebarredValidator {
  constructor (state = {}, props = {}) {
    this.hasDebarment = props.HasDebarment
    this.list = props.List || []
    this.listBranch = props.ListBranch
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

      return this.list.every(item => new DebarredValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class DebarredValidator {
  constructor (state = {}, props = {}) {
    this.agency = props.Agency
    this.date = props.Date
    this.explanation = props.Explanation
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
