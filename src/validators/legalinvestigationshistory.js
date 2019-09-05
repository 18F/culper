import store from 'services/store'
import { validateModel, hasYesOrNo } from 'models/validate'
import investigation from 'models/investigation'
import { requireLegalInvestigationClearanceGranted } from 'helpers/branches'

export const validateInvestigation = (data, formType) => (
  validateModel(data, investigation, {
    requireLegalInvestigationClearanceGranted: requireLegalInvestigationClearanceGranted(formType),
  })
)

export const validateLegalInvestigationsHistory = (data, formType, options = {}) => {
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

  const modelOptions = {
    requireLegalInvestigationClearanceGranted: requireLegalInvestigationClearanceGranted(formType),
  }

  return validateModel(data, legalInvestigationsHistoryModel, { ...options, ...modelOptions })
}

export default class LegalInvestigationsHistoryValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.hasHistory = (data.HasHistory || {}).value
    this.list = data.List || {}
    this.formType = formType
  }

  isValid() {
    return validateLegalInvestigationsHistory(this.data, this.formType) === true
  }
}

export class HistoryValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
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
    return validateInvestigation(this.data, this.formType) === true
  }
}
