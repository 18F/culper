import LocationValidator from './location'
import { validBranch, validDateField, validGenericTextfield } from './helpers'

export default class NonCriminalCourtActionsValidator {
  constructor (state, props) {
    this.hasCourtActions = state.HasCourtActions
    this.list = state.List
    this.listBranch = state.ListBranch
  }

  validHasCourtActions () {
    return validBranch(this.hasCourtActions)
  }

  validNonCriminalCourtActions () {
    if (this.validHasCourtActions() && this.hasCourtActions === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      const result = new NonCriminalCourtActionValidator(item.CourtAction, null).isValid()
      if (!result) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasCourtActions() &&
      this.validNonCriminalCourtActions()
  }
}

export class NonCriminalCourtActionValidator {
  constructor (state = {}) {
    this.civilActionDate = state.CivilActionDate
    this.courtName = state.CourtName
    this.courtAddress = state.CourtAddress
    this.natureOfAction = state.NatureOfAction
    this.resultsOfAction = state.ResultsOfAction
    this.principalPartyNames = state.PrincipalPartyNames
  }

  isValid () {
    return validDateField(this.civilActionDate) &&
      validGenericTextfield(this.courtName) &&
      new LocationValidator(this.courtAddress).isValid() &&
      validGenericTextfield(this.natureOfAction) &&
      validGenericTextfield(this.resultsOfAction) &&
      validGenericTextfield(this.principalPartyNames)
  }
}
