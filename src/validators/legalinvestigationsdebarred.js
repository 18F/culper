import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class LegalInvestigationsDebarredValidator {
  constructor(data = {}) {
    this.hasDebarment = (data.HasDebarment || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasDebarment === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new DebarredValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class DebarredValidator {
  constructor(data = {}) {
    this.agency = data.Agency
    this.date = data.Date
    this.explanation = data.Explanation
  }

  validAgency() {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validExplanation() {
    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  isValid() {
    return this.validAgency() && this.validDate() && this.validExplanation()
  }
}
