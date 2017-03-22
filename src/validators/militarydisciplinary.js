import { validGenericTextfield, validDateField } from './helpers'

export default class MilitaryDisciplinaryValidator {
  constructor (state = {}, props = {}) {
    this.hasDisciplinary = state.HasDisciplinary
    this.list = state.List || []
  }

  validDisciplinary () {
    return this.hasDisciplinary === 'Yes' || this.hasDisciplinary === 'No'
  }

  validItems () {
    if (this.validDisciplinary() && this.hasDisciplinary === 'No') {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    for (const procedure of this.list) {
      if (new ProcedureValidator(procedure.Item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validDisciplinary() &&
      this.validItems()
  }
}

export class ProcedureValidator {
  constructor (state = {}, props = {}) {
    this.date = state.Date
    this.offenses = state.Offenses
    this.name = state.Name
    this.court = state.Court
    this.outcome = state.Outcome
  }

  validDate () {
    return validDateField(this.date)
  }

  validOffenses () {
    return validGenericTextfield(this.offenses)
  }

  validName () {
    return validGenericTextfield(this.name)
  }

  validCourt () {
    return validGenericTextfield(this.court)
  }

  validOutcome () {
    return validGenericTextfield(this.outcome)
  }

  isValid () {
    return this.validDate() &&
      this.validOffenses() &&
      this.validName() &&
      this.validCourt() &&
      this.validOutcome()
  }
}
