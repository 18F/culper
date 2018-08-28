import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class LegalInvestigationsRevokedValidator {
  constructor(data = {}) {
    this.hasRevocations = (data.HasRevocations || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasRevocations === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new RevokedValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class RevokedValidator {
  constructor(data = {}) {
    this.date = data.Date
    this.agency = data.Agency
    this.explanation = data.Explanation
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validAgency() {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validExplanation() {
    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  isValid() {
    return this.validDate() && this.validAgency() && this.validExplanation()
  }
}
