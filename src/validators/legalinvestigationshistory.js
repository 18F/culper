import { validateModel, hasYesOrNo } from 'models/validate'
import investigation from 'models/investigation'

export const validateInvestigation = data => (
  validateModel(data, investigation) === true
)

export const validateLegalInvestigationsHistory = (data) => {
  const legalInvestigationsHistoryModel = {
    HasHistory: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasHistory && attributes.HasHistory.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: investigation },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalInvestigationsHistoryModel) === true
}

export default class LegalInvestigationsHistoryValidator {
  constructor(data = {}) {
    this.data = data
    this.hasHistory = (data.HasHistory || {}).value
    this.list = data.List || {}
  }

  isValid() {
    return validateLegalInvestigationsHistory(this.data)
  }
}

export class HistoryValidator {
  constructor(data = {}) {
    this.data = data
  }

  validAgency() {
    return validateModel(this.data, {
      Agency: investigation.Agency,
      AgencyExplanation: investigation.AgencyExplanation,
    }) === true
  }

  validCompleted() {
    return validateModel(this.data, {
      Completed: investigation.Completed,
    }) === true
  }

  validGranted() {
    return validateModel(this.data, {
      Granted: investigation.Granted,
    }) === true
  }

  validClearance() {
    return validateModel(this.data, {
      ClearanceLevel: investigation.ClearanceLevel,
    }) === true
  }

  isValid() {
    return validateInvestigation(this.data)
  }
}
