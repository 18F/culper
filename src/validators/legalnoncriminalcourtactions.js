import LocationValidator from './location'
import {
  validAccordion,
  validBranch,
  validDateField,
  validGenericTextfield
} from './helpers'

export default class NonCriminalCourtActionsValidator {
  constructor(data = {}) {
    this.hasCourtActions = (data.HasCourtActions || {}).value
    this.list = data.List || {}
  }

  validHasCourtActions() {
    return validBranch(this.hasCourtActions)
  }

  validNonCriminalCourtActions() {
    if (this.validHasCourtActions() && this.hasCourtActions === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new NonCriminalCourtActionValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasCourtActions() && this.validNonCriminalCourtActions()
  }
}

export class NonCriminalCourtActionValidator {
  constructor(data = {}) {
    this.civilActionDate = data.CivilActionDate
    this.courtName = data.CourtName
    this.courtAddress = data.CourtAddress
    this.natureOfAction = data.NatureOfAction
    this.resultsOfAction = data.ResultsOfAction
    this.principalPartyNames = data.PrincipalPartyNames
  }

  isValid() {
    return (
      validDateField(this.civilActionDate) &&
      validGenericTextfield(this.courtName) &&
      new LocationValidator(this.courtAddress).isValid() &&
      validGenericTextfield(this.natureOfAction) &&
      validGenericTextfield(this.resultsOfAction) &&
      validGenericTextfield(this.principalPartyNames)
    )
  }
}
