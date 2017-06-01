import { validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class LegalInvestigationsHistoryValidator {
  constructor (state = {}, props = {}) {
    this.hasHistory = props.HasHistory
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasHistory === 'No') {
      return true
    }

    if (this.hasHistory === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new HistoryValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class HistoryValidator {
  constructor (state = {}, props = {}) {
    this.agencyNotApplicable = props.AgencyNotApplicable
    this.agency = props.Agency
    this.completedNotApplicable = props.CompletedNotApplicable
    this.completed = props.Completed
    this.issued = props.Issued
    this.grantedNotApplicable = props.GrantedNotApplicable
    this.granted = props.Granted
    this.clearanceNotApplicable = props.ClearanceNotApplicable
    this.clearance = props.Clearance
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

  validIssued () {
    return !!this.issued && validGenericTextfield(this.issued)
  }

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
      this.validIssued() &&
      this.validGranted() &&
      this.validClearance()
  }
}
