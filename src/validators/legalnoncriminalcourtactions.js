import LocationValidator from './location'
import { validBranch, validDateField, validGenericTextfield } from './helpers'

export default class NonCriminalCourtActionsValidator {
  constructor (data) {
    this.hasCourtActions = data.HasCourtActions
    this.list = data.List
    this.listBranch = data.ListBranch
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
      const result = new NonCriminalCourtActionValidator(item.Item).isValid()
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
  constructor (data = {}) {
    this.civilActionDate = data.CivilActionDate
    this.courtName = data.CourtName
    this.courtAddress = data.CourtAddress
    this.natureOfAction = data.NatureOfAction
    this.resultsOfAction = data.ResultsOfAction
    this.principalPartyNames = data.PrincipalPartyNames
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
