import { validAccordion, validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class LegalInvestigationsHistoryValidator {
  constructor (data = {}) {
    this.hasHistory = (data.HasHistory || {}).value
    this.list = data.List || {}
  }

  validList () {
    if (this.hasHistory === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new HistoryValidator(item).isValid()
    })
  }

  isValid () {
    return this.validList()
  }
}

export class HistoryValidator {
  constructor (data = {}) {
    this.agencyNotApplicable = data.AgencyNotApplicable
    this.agency = data.Agency
    this.completedNotApplicable = data.CompletedNotApplicable
    this.completed = data.Completed
    this.issued = data.Issued // optional
    this.grantedNotApplicable = data.GrantedNotApplicable
    this.granted = data.Granted
    this.clearanceNotApplicable = data.ClearanceNotApplicable
    this.clearance = data.Clearance
  }

  validAgency () {
    return validNotApplicable(this.agencyNotApplicable, () => {
      let valid = !!this.agency && !!this.agency.Agency
      if (valid && ['U.S. Department of Treasury', 'Foreign government', 'Other'].includes(this.agency.Agency)) {
        valid = !!this.agency.Explanation && validGenericTextfield(this.agency.Explanation)
      }
      return valid
    })
  }

  validCompleted () {
    return validNotApplicable(this.completedNotApplicable, () => {
      return !!this.completed && validDateField(this.completed)
    })
  }

  // validIssued () {
  //   return !!this.issued && validGenericTextfield(this.issued)
  // }

  validGranted () {
    return validNotApplicable(this.grantedNotApplicable, () => {
      return !!this.granted && validDateField(this.granted)
    })
  }

  validClearance () {
    return validNotApplicable(this.clearanceNotApplicable, () => {
      let valid = !!this.clearance && !!this.clearance.Level
      if (valid && this.clearance.Level === 'Other') {
        valid = !!this.clearance.Explanation && validGenericTextfield(this.clearance.Explanation)
      }
      return valid
    })
  }

  isValid () {
    return this.validAgency() &&
      this.validCompleted() &&
      // this.validIssued() &&
      this.validGranted() &&
      this.validClearance()
  }
}
