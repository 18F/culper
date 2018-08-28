import {
  validAccordion,
  validGenericTextfield,
  validDateField,
  validNotApplicable
} from './helpers'

export default class LegalInvestigationsHistoryValidator {
  constructor(data = {}) {
    this.hasHistory = (data.HasHistory || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasHistory === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new HistoryValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class HistoryValidator {
  constructor(data = {}) {
    this.agencyNotApplicable = data.AgencyNotApplicable
    this.agency = data.Agency
    this.agencyExplanation = data.AgencyExplanation
    this.completedNotApplicable = data.CompletedNotApplicable
    this.completed = data.Completed
    this.issued = data.Issued // optional
    this.grantedNotApplicable = data.GrantedNotApplicable
    this.granted = data.Granted
    this.clearanceNotApplicable = data.ClearanceLevelNotApplicable
    this.clearance = data.ClearanceLevel || {}
  }

  validAgency() {
    return validNotApplicable(this.agencyNotApplicable, () => {
      let valid = !!this.agency && !!this.agency.value
      if (
        valid &&
        ['U.S. Department of Treasury', 'Foreign government', 'Other'].includes(
          (this.agency || {}).value
        )
      ) {
        valid =
          !!this.agencyExplanation &&
          validGenericTextfield(this.agencyExplanation || {})
      }
      return valid
    })
  }

  validCompleted() {
    return validNotApplicable(this.completedNotApplicable, () => {
      return !!this.completed && validDateField(this.completed)
    })
  }

  validGranted() {
    return validNotApplicable(this.grantedNotApplicable, () => {
      return !!this.granted && validDateField(this.granted)
    })
  }

  validClearance() {
    return validNotApplicable(this.clearanceNotApplicable, () => {
      let valid = !!((this.clearance || {}).Level || {}).value
      if (valid && ((this.clearance || {}).Level || {}).value === 'Other') {
        valid = validGenericTextfield((this.clearance || {}).Explanation || {})
      }
      return valid
    })
  }

  isValid() {
    return (
      this.validAgency() &&
      this.validCompleted() &&
      this.validGranted() &&
      this.validClearance()
    )
  }
}
