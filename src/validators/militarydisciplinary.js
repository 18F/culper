import MilitaryHistoryValidator from './militaryhistory'
import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export const hideDisciplinaryProcedures = (store = {}) => {
  const history = (store.Military || {}).History
  return !new MilitaryHistoryValidator(history, null).hasHistory()
}

export default class MilitaryDisciplinaryValidator {
  constructor(data = {}) {
    this.hasDisciplinary = (data.HasDisciplinary || {}).value
    this.list = data.List || {}
  }

  validDisciplinary() {
    return this.hasDisciplinary === 'Yes' || this.hasDisciplinary === 'No'
  }

  validItems() {
    if (this.validDisciplinary() && this.hasDisciplinary === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ProcedureValidator(item).isValid()
    })
  }

  isValid() {
    return this.validDisciplinary() && this.validItems()
  }
}

export class ProcedureValidator {
  constructor(data = {}) {
    this.date = data.Date
    this.offenses = data.Offenses
    this.name = data.Name
    this.court = data.Court
    this.outcome = data.Outcome
  }

  validDate() {
    return validDateField(this.date)
  }

  validOffenses() {
    return validGenericTextfield(this.offenses)
  }

  validName() {
    return validGenericTextfield(this.name)
  }

  validCourt() {
    return validGenericTextfield(this.court)
  }

  validOutcome() {
    return validGenericTextfield(this.outcome)
  }

  isValid() {
    return (
      this.validDate() &&
      this.validOffenses() &&
      this.validName() &&
      this.validCourt() &&
      this.validOutcome()
    )
  }
}
